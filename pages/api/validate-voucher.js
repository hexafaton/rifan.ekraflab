export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items, voucherCode = "" } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "items harus berupa array" });
  }

  const normalizePrice = (price) => {
    return parseInt(String(price).replace(/[^\d]/g, ""), 10) || 0;
  };

  const total = items.reduce((sum, item) => {
    return sum + normalizePrice(item.price) * Number(item.quantity || 0);
  }, 0);

  const code = String(voucherCode).trim().toUpperCase();
  const valid = code === "OPENING26";
  const discountAmount = valid ? Math.round(total * 0.1) : 0;
  const discountedTotal = total - discountAmount;

  res.status(200).json({
    valid,
    discountAmount,
    total,
    discountedTotal,
    voucherCode: code,
  });
}
