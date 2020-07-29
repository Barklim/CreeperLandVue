## Rt
https://coursehunter.net/course/sozdanie-sayta-na-vue-js
https://github.com/slastonm
http://minecraftrating.ru/
https://tmonitoring.com/

## WorkFlow
npm run dev
npm run serve

node 12.14.0 => 12.16.0
npm 6.13.4 => 6.13.4
vue 4.4.6 => 4.1.2

## TODO

* vuex
* typescript
* express
* typeorm - pgsql
* unitpay.money

* particles in header

* HeaderComp bind state class and event

ркон

1) админка не нужна, мы умеем работать с базой и нам так даже проще
Контент не фиксированный: мы иногда добавляем новые донаты, изменяем ссылки на картинки, цену доната, описание
Роли юзерам раздаем через ркон, в базе для каждого доната указывается список команд, которые должны быть выполнены после успешной оплаты
Типо /lp user %username% parent add enderman
2) у меня еще три проекта) время не хочется тратить. Майн для нас хобби, которое, пока, не приносит денег. Мы только платим за сервера, вктаргет и рекламу на мониторингах.

Дискорд виджет как тут
  https://mcnova.ru/
Убрать все закоменченные строки если не нужно
.
ghpages and zeit
Предложить сделать страницу блога с рефреном на vk
авторизацию
навигацию, интернационализацию

## questions
1.Как определять количество игроков онлайн(также по запросу как и везде)

## Faq
1.Для того чтобы вернуть страницу логинизации нужно раскоментить в router\index.ts

## Requests
vue ui
npm audit fix
You can now open Cypress by running: node_modules\.bin\cypress open
https://jwt.io/j
https://project365.design/

## Routes
* http://localhost:8080/Login1
* http://localhost:8080/Login
* http://localhost:8080/about
* http://localhost:8080/

## Garbage
App.vue
 <HeaderComponent
  v-if="$route.name != 'Login' && $route.name != '404'"
></HeaderComponent> 

import HeaderComponent from "./components/layout/HeaderComponent";

export default {
  name: "app",
  components: {
    HeaderComponent,
    FooterComponent
  }
};

vue добавить класс
https://ru.vuejs.org/v2/guide/events.html

3) 