# Quiz Week 3 - ReactJS Sanbercode

------------

## 1. setup (5 poin)
buatlah repository baru dengan nama "quiz-3-reactjs-sanbercode-0720" yang berisi project reactjs yang sudah ada package axios dan react-router-dom

## 2. convert dari html ke jsx (10 poin)
ubahlah index.html dari tugas2 menjadi jsx ke dalam reactjs beserta dengan css dan gambarnya

anda bisa menggunakan tugas2 anda sendiri atau menggunakan kode yang ada di https://gitlab.com/sanbercode-reactjs/tugas-bootcamp-juli-2020/-/tree/master/Pekan-1/hari-ke-2

## 3. router (15 poin)
ubahlah bagian body tersebut menjadi switch yang isinya adalah route dari tiap component yang akan di gunakan
dan ubahlah nav link itu sesuai dengan component yang nantinya akan di buat untuk nav menu. nav menu sendiri terdiri dari:
- Home
- About
- Movie List Editor (hanya muncul jika user login)
- Login (Jika user belum login)

![quiz3-1.jpg](quiz3-1.jpg?raw=true)

## 4. about component (5 poin)
ubahlah about.html dari tugas2 menjadi jsx ke dalam reactjs

gunakan function component soal ini

## 5. home component (15)
home component ini berisi daftar movie yang dengan diurutkan berdasarkan rating

![quiz3-1.jpg](quiz3-1.jpg?raw=true)

gunakan class component dan axios untuk soal ini (untuk url API bisa menggunakan yang ada di crud)

## 6. crud film component(25)
buatlah CRUD movie yang berisi form movie, table movie beserta delete dan edit.

untuk atribut yang dimiliki oleh movie diantaranya adalah:
- title(string)
- description(textarea)
- year(integer)
- duration(integer) - dalam menit
- genre(string)
- rating(integer) - minimal 1 - maksimal 10

pastikan validasi inputnya disesuaikan dengan atribut diatas (misal rating hanya bisa diisi oleh angka 1 hingga 10)

berikut ini url API yang digunakan dalam CRUD movies ini: 
```php
GET http://backendexample.sanbercloud.com/api/movies

POST http://backendexample.sanbercloud.com/api/movies

PUT http://backendexample.sanbercloud.com/api/movies/{ID_MOVIES}

DELETE http://backendexample.sanbercloud.com/api/movies/{ID_MOVIES}
```

gunakan hooks dan axios untuk mengerjakan soal ini (tambahkan styling pada tabel dan form)

## 7. Login (25)
buatlah fitur login dengan ketentuan user yang belum login tidak dapat membuka halaman movie list editor
dan menu movie list editor tidak akan muncul jika user belum login

gunakan context untuk mengerjakan soal ini

------------

## Kumpulkan tugas
tugas di kumpulkan dengan mengirimkan link repository quiz anda ke web sanbercode, untuk teknis pengumpulannya sama seperti tugas harian


