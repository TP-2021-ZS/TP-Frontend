##Frontend
V terminálovom riadku v priečinku TeamProject/src/main/frontend spustiť príkaz npm install.
Následne spustiť príkaz npm start.
Frontend beží na: http://localhost:3000/

##Frontend - verzia 1
Potrebné doinštalovať:
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/raleway
npm install @mui/icons-material
npm install @material-ui/styles

##Backend
Backend beží na: http://localhost:8080/
V application.properties je potrebné nastaviť pripojenie na databázu.
Ja som sa pripojila na postgres databázu ale je možné sa pripojiť aj na inú MariaDb, MySQL...,
len nezabudnúť pridať driver do pom.xml ak budete meniť typ databázy.

Ukladanie do db je spravené cez ORM takze nieje treba vytvárať žiadne tabuľky

