const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const vouchers = {
  OPENING26: {
    rate: 0.10,
  },
};

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function normalizePrice(price) {
  return parseInt(String(price).replace(/[^\d]/g, ""), 10) || 0;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + normalizePrice(item.price) * Number(item.quantity || 0);
  }, 0);
}

app.post("/api/validate-voucher", (req, res) => {
  const { items, voucherCode = "" } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "items harus berupa array" });
  }

  const total = calculateTotal(items);
  const code = String(voucherCode).trim().toUpperCase();
  const voucher = vouchers[code];
  const valid = Boolean(voucher);
  const discountAmount = valid ? Math.round(total * voucher.rate) : 0;
  const discountedTotal = total - discountAmount;

  res.json({
    valid,
    discountAmount,
    total,
    discountedTotal,
    voucherCode: code,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
