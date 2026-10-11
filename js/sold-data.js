/* =====================================================================
   SOLD VEHICLES — the only file to edit when Wes posts a sale (index4).
   Newest first. Put the photo in assets/img/sold/ (or anywhere under assets/).

   Fields
     year, make, model   required
     miles               optional, number — shown as "1,140 mi"
     photo               required, path to the image
     alt                 optional — defaults to "year make model"
     link                optional — e.g. the Instagram post for this car
     placeholder         true while the entry is a stand-in, not a real sale.
                         While any entry has it, the section shows a visible
                         "sample listings" note. Delete these entries (or the
                         flag) once real sales are posted.
   ===================================================================== */
window.SOLD_VEHICLES = [
  { year: 2023, make: 'Chevrolet', model: 'Corvette Z06', miles: 1140,
    photo: 'assets/img/inventory/Chevrolet Corvette Z06 - Only 1,140 miles year 2023 miles 1,140.jpg',
    placeholder: true },
  { year: 2016, make: 'Lamborghini', model: 'Aventador', miles: 1874,
    photo: 'assets/img/inventory/Lamborghini Aventador year 2016 miles 1,874.jpg',
    placeholder: true },
  { year: 2018, make: 'Mercedes-Benz', model: 'AMG GT', miles: 4443,
    photo: 'assets/img/inventory/Mercedes-Benz AMG GT - Green Hell Magno - Carbon Brakes year 2018 miles 4,443.jpg',
    placeholder: true },
  { year: 2024, make: 'Lamborghini', model: 'Urus', miles: 1453,
    photo: 'assets/img/inventory/Lamborghini Urus - Only 1,480 Miles year 2024 miles 1,453.jpg',
    placeholder: true },
  { year: 2015, make: 'Porsche', model: '918 Spyder',
    photo: 'assets/img/inventory/Porsche 918 Spyder.jpg',
    placeholder: true },
  { year: 2024, make: 'BMW', model: 'M4', miles: 38283,
    photo: 'assets/img/inventory/BMW M4 - 6 Speed Manual year 2024 miles 38,283.jpg',
    alt: '2024 BMW M4 6-speed manual',
    placeholder: true }
];
