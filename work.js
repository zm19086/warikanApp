// 合計金額と人数を取得
const number = document.getElementById('number');
const price = document.getElementById('price');


let show_form = false;

// 人数に応じて記名欄を追加
const create_form = () => {
  
  const payment_average = Number((price.value - (price.value % number.value)) / number.value);
  document.getElementById('each_pay').textContent = 'ひとりあたりの支払い金額は' + payment_average + '円です。余りは' + Number(price.value % number.value) + '円です。';

  for (let i = 1; i - 1 < number.value; i++) {

    const member_element = document.getElementById('member');
    const new_member = document.createElement('li');
    new_member.textContent = 'メンバー' + i + '：';

    const member_inp = document.createElement('input');
    member_inp.setAttribute('type', 'text');
    member_inp.setAttribute('class', 'form names');
    member_inp.setAttribute('placeholder', '名前');
    member_inp.setAttribute('id', 'member' + i);

    const member_pay = document.createElement('input');
    member_pay.setAttribute('type', 'number');
    member_pay.setAttribute('class', 'form pay');
    member_pay.setAttribute('placeholder', '支払い金額');

    member_element.appendChild(new_member);
    new_member.appendChild(member_inp);
    new_member.appendChild(member_pay);
  }

  show_form = true;
}

// okボタンを作る
const create_button = () => {

  const ok = document.getElementById('ok');
  const result_btn = document.createElement('input');
  result_btn.setAttribute('type', 'button');
  result_btn.setAttribute('value', '入力した配分で決定する');
  result_btn.setAttribute('id', 'result');
  
  ok.appendChild(result_btn);
}


// クリックしたら実行
document.getElementById('decide').addEventListener('click', function() {
  if (number.value === "" || price.value === "") {
    document.getElementById('each_pay').textContent = '未記入の項目があります。';
  } else if (show_form === false) {
    create_form();
    create_button();
  };
})

// 入力された名前と金額を配列に格納

let list_array = [];

const save_data = () => {

  let names_array = [];
  let payment_array = [];

  const members = document.getElementsByClassName('form names');
  const payments = document.getElementsByClassName('form pay');

  for (let i = 0; i < number.value; i++) {
    names_array.push(members.item(i).value);
    payment_array.push(payments.item(i).value);
  };

  list_array.push(names_array, payment_array);

  console.log(list_array);
}

// 配列から各々の差額を計算
const culculation = () => {

  for (let i = 0; i < number.value; i++) {
    console.log(Number((price.value - (price.value % number.value)) / number.value) - list_array[1][i]);
  };
}

// クリックしたら実行
document.getElementById('ok').addEventListener('click', function() {

  save_data();
  culculation();

})

const create_td = () => {

  const details = document.getElementById('details');
  const td = document.createElement('td');
  for (let i = 0; i < number.value; i++) {
    td.textContent = names_array[i];
    details.appendChild(td);
  };
  
}

const create_table = () => {

  for (let i = 0; i < number.value; i++) {
    
    create_tr();
    create_td();

  };
}