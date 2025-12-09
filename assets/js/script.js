document.getElementById("year").textContent = new Date().getFullYear();

const whatsappNumber = "6281249357369"; // REPLACE with your number
const defaultMessage = encodeURIComponent(
  "Halo, saya mau order kaos Zero Origin (tulis model + ukuran + warna)."
);

document.getElementById("whatsappBtn").addEventListener("click", () => {
  window.open(
    "https://wa.me/" + whatsappNumber + "?text=" + defaultMessage,
    "_blank"
  );
});
document.getElementById("shopNow").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Load products.json
fetch("products.json")
  .then((r) => r.json())
  .then((data) => {
    const container = document.getElementById("products");
    data.products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
  <div class="img" style="background-image:url('assets/img/${p.image}')"></div>
  <h4>${p.name}</h4>
  <div class="price">
  ${
    p.discount_percent
      ? `<span style="text-decoration:line-through; opacity:.6;">
           IDR ${p.price.toLocaleString("id-ID")}
         </span><br>
         <span style="color:#c60000; font-weight:700;">
           IDR ${(
             p.price -
             (p.price * p.discount_percent) / 100
           ).toLocaleString("id-ID")}
         </span>`
      : `IDR ${p.price.toLocaleString("id-ID")}`
  }
</div>

  <div>${p.colors.join(" • ")}</div>
  <div><button class="btn order" data-name="${p.name}">Order</button></div>
`;

      container.appendChild(card);
    });

    document.querySelectorAll(".order").forEach((b) => {
      b.addEventListener("click", (e) => {
        const name = e.target.dataset.name;
        const msg = encodeURIComponent(
          "Halo, saya mau order: " + name + " - ukuran S/M/L/XL - warna: ..."
        );
        window.open(
          "https://wa.me/" + whatsappNumber + "?text=" + msg,
          "_blank"
        );
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
