document.addEventListener('DOMContentLoaded', () => {
  const packageSelect = document.getElementById('package');
  const pagesRange = document.getElementById('pages');
  const picturesRange = document.getElementById('pictures');

  const pagesOutput = document.getElementById('pages_val');
  const picturesOutput = document.getElementById('pic_val');

  const checkboxes = [
    { el: document.getElementById('shop'), name: 'Online Shop', price: 500 },
    { el: document.getElementById('payment'), name: 'Zahlungs-Integration', price: 400 },
    { el: document.getElementById('gallery'), name: 'Gallerie', price: 200 },
    { el: document.getElementById('blog'), name: 'Blog', price: 300 },
    { el: document.getElementById('sections'), name: 'Kunden-/Mitgliederbereich', price: 350 },
    { el: document.getElementById('hosting'), name: 'Hosting', price: 150 },
    { el: document.getElementById('seo'), name: 'SEO-Optimierung', price: 180 },
    { el: document.getElementById('express'), name: 'Express Lieferung', price: 300 }
  ];

  const outputList = document.getElementById('output-list');
  const totalPriceHeading = document.querySelector('#output-div h4');

  const packages = {
    lite: { price: 500, basePages: 2, basePics: 3 },
    basic: { price: 900, basePages: 3, basePics: 6 },
    premium: { price: 1200, basePages: 5, basePics: 12 },
    programmiert: { price: 900, basePages: 4, basePics: 5 }
  };

  const pricePerPage = 150;
  const pricePerPicture = 20;

  function disableInputs() {
    pagesRange.disabled = true;
    picturesRange.disabled = true;
    checkboxes.forEach(cb => cb.el.disabled = true);
  }

  function enableInputs() {
    pagesRange.disabled = false;
    picturesRange.disabled = false;
    checkboxes.forEach(cb => cb.el.disabled = false);
  }

  function updateOutput() {
    const pkgKey = packageSelect.value;

    if (packages.hasOwnProperty(pkgKey)) {
      enableInputs();
      const pkg = packages[pkgKey];

      const basePrice = pkg.price;
      const basePages = pkg.basePages;
      const basePics = pkg.basePics;

      const extraPages = parseInt(pagesRange.value);
      const extraPics = parseInt(picturesRange.value);

      pagesOutput.value = `${basePages} + ${extraPages}`;
      picturesOutput.value = `${basePics} + ${extraPics}`;

      const pagesPrice = extraPages * pricePerPage;
      const picturesPrice = extraPics * pricePerPicture;

      let checkboxesPrice = 0;
      const checkedBoxes = [];

      checkboxes.forEach(cb => {
        if (cb.el.checked) {
          checkboxesPrice += cb.price;
          checkedBoxes.push(cb);
        }
      });

      const totalPrice = basePrice + pagesPrice + picturesPrice + checkboxesPrice;

      outputList.innerHTML = '';

      const liBase = document.createElement('li');
      liBase.textContent = `Grundpaket: ${pkgKey.charAt(0).toUpperCase() + pkgKey.slice(1)} - ${basePrice}€ (inkl. ${basePages} Seiten, ${basePics} Bilder)`;
      outputList.appendChild(liBase);

      const liPages = document.createElement('li');
      liPages.textContent = `Zusätzliche Seiten (${extraPages} x ${pricePerPage}€): ${pagesPrice}€`;
      outputList.appendChild(liPages);

      const liPics = document.createElement('li');
      liPics.textContent = `Zusätzliche Bilder (${extraPics} x ${pricePerPicture}€): ${picturesPrice}€`;
      outputList.appendChild(liPics);

      checkedBoxes.forEach(cb => {
        const liCb = document.createElement('li');
        liCb.textContent = `${cb.name}: ${cb.price}€`;
        outputList.appendChild(liCb);
      });

      totalPriceHeading.textContent = `Gesamtpreis: ${totalPrice}€`;
    } else {
      disableInputs();
      outputList.innerHTML = '';
      totalPriceHeading.textContent = '';
    }
  }

  disableInputs();

  packageSelect.addEventListener('change', updateOutput);
  pagesRange.addEventListener('input', updateOutput);
  picturesRange.addEventListener('input', updateOutput);
  checkboxes.forEach(cb => cb.el.addEventListener('change', updateOutput));
});
