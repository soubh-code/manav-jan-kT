import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { DonationFrequency, DonationStatus } from "@/lib/donationConfig";

export type DonorDetails = {
  fullName: string;
  email: string;
  mobile: string;
  pan?: string;
  address: string;
  consent: boolean;
};

type OrderRecordInput = {
  localOrderId: string;
  razorpayOrderId: string;
  amountRupees: number;
  amountPaise: number;
  causeId: string;
  causeTitle: string;
  frequency: DonationFrequency;
  donor: DonorDetails;
  status: DonationStatus;
};

type PaymentRecordInput = {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  localOrderId?: string;
  amountPaise?: number;
  status: DonationStatus;
  method?: string | null;
  rawPayload?: unknown;
};

const dataDir = path.join(process.cwd(), ".data");
const dbPath = path.join(dataDir, "donations.sqlite");

let db: Database.Database | undefined;

function getDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS donation_orders (
        local_order_id TEXT PRIMARY KEY,
        razorpay_order_id TEXT NOT NULL UNIQUE,
        amount_rupees INTEGER NOT NULL,
        amount_paise INTEGER NOT NULL,
        cause_id TEXT NOT NULL,
        cause_title TEXT NOT NULL,
        frequency TEXT NOT NULL,
        donor_full_name TEXT NOT NULL,
        donor_email TEXT NOT NULL,
        donor_mobile TEXT NOT NULL,
        donor_pan TEXT,
        donor_address TEXT NOT NULL,
        donor_consent INTEGER NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('created', 'paid', 'failed', 'refunded')),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS donation_payments (
        razorpay_payment_id TEXT PRIMARY KEY,
        razorpay_order_id TEXT NOT NULL,
        local_order_id TEXT,
        amount_paise INTEGER,
        status TEXT NOT NULL CHECK(status IN ('created', 'paid', 'failed', 'refunded')),
        method TEXT,
        raw_payload TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS razorpay_webhook_events (
        event_id TEXT PRIMARY KEY,
        event_name TEXT NOT NULL,
        processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  return db;
}

export function createDonationOrder(input: OrderRecordInput) {
  const database = getDb();
  database
    .prepare(
      `INSERT INTO donation_orders (
        local_order_id, razorpay_order_id, amount_rupees, amount_paise,
        cause_id, cause_title, frequency, donor_full_name, donor_email,
        donor_mobile, donor_pan, donor_address, donor_consent, status
      ) VALUES (
        @localOrderId, @razorpayOrderId, @amountRupees, @amountPaise,
        @causeId, @causeTitle, @frequency, @fullName, @email,
        @mobile, @pan, @address, @consentValue, @status
      )`
    )
    .run({
      ...input,
      ...input.donor,
      pan: input.donor.pan || null,
      consentValue: input.donor.consent ? 1 : 0
    });
}

export function getOrderByRazorpayId(razorpayOrderId: string) {
  return getDb()
    .prepare("SELECT * FROM donation_orders WHERE razorpay_order_id = ?")
    .get(razorpayOrderId) as Record<string, unknown> | undefined;
}

export function getOrderByLocalId(localOrderId: string) {
  return getDb()
    .prepare("SELECT * FROM donation_orders WHERE local_order_id = ?")
    .get(localOrderId) as Record<string, unknown> | undefined;
}

export function getPaidPaymentByLocalOrderId(localOrderId: string) {
  return getDb()
    .prepare(
      `SELECT p.*
       FROM donation_payments p
       JOIN donation_orders o ON o.razorpay_order_id = p.razorpay_order_id
       WHERE o.local_order_id = ?
       ORDER BY p.updated_at DESC
       LIMIT 1`
    )
    .get(localOrderId) as Record<string, unknown> | undefined;
}

export function updateOrderStatus(razorpayOrderId: string, status: DonationStatus) {
  getDb()
    .prepare(
      "UPDATE donation_orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE razorpay_order_id = ? AND status != ?"
    )
    .run(status, razorpayOrderId, status);
}

export function upsertPayment(input: PaymentRecordInput) {
  getDb()
    .prepare(
      `INSERT INTO donation_payments (
        razorpay_payment_id, razorpay_order_id, local_order_id, amount_paise,
        status, method, raw_payload
      ) VALUES (
        @razorpayPaymentId, @razorpayOrderId, @localOrderId, @amountPaise,
        @status, @method, @rawPayload
      )
      ON CONFLICT(razorpay_payment_id) DO UPDATE SET
        status = excluded.status,
        amount_paise = COALESCE(excluded.amount_paise, donation_payments.amount_paise),
        method = COALESCE(excluded.method, donation_payments.method),
        raw_payload = COALESCE(excluded.raw_payload, donation_payments.raw_payload),
        updated_at = CURRENT_TIMESTAMP`
    )
    .run({
      ...input,
      localOrderId: input.localOrderId || null,
      amountPaise: input.amountPaise || null,
      method: input.method || null,
      rawPayload: input.rawPayload ? JSON.stringify(input.rawPayload) : null
    });
}

export function markPaymentRefunded(razorpayPaymentId: string, rawPayload?: unknown) {
  getDb()
    .prepare(
      `UPDATE donation_payments
       SET status = 'refunded',
           raw_payload = COALESCE(?, raw_payload),
           updated_at = CURRENT_TIMESTAMP
       WHERE razorpay_payment_id = ?`
    )
    .run(rawPayload ? JSON.stringify(rawPayload) : null, razorpayPaymentId);
}

export function markWebhookProcessed(eventId: string, eventName: string) {
  const result = getDb()
    .prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_name) VALUES (?, ?)")
    .run(eventId, eventName);

  return result.changes === 1;
}
