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

// マイナス以下の数値を空データに置き換える関数
const minus_cut = (num) => {
  if (num >= 0) {
    return num;
  } else {
    return 0;
  };
}

// 入力された名前と金額を配列に格納
let list_array = [];

const save_data = () => {

  let names_array = [];
  let change_array = [];
  let difference_array = [];
  let payment_array = [];

  const members = document.getElementsByClassName('form names');
  const payments = document.getElementsByClassName('form pay');
  
  for (let i = 0; i < number.value; i++) {
    names_array.push(members.item(i).value);
    payment_array.push(payments.item(i).value);
    change_array.push(minus_cut(payments.item(i).value - Number((price.value - (price.value % number.value)) / number.value)));
    difference_array.push(minus_cut(Number((price.value - (price.value % number.value)) / number.value) - payments.item(i).value));
  };
  
  list_array.push(names_array, change_array, difference_array, payment_array);
  
  console.log(list_array);
}


// テーブルレコーダーを作る関数
const create_tr = () => {
  const details = document.getElementById('details');
  const tr = document.createElement('tr');
  for (let i = 0; i < number.value; i++) {
    tr.setAttribute('id', 'tr' + i);
    details.appendChild(tr);
  };
}

// テーブルデータのクラス名を配列に格納
const table_class = ['members', 'change', 'difference'];

// テーブルデータを作る関数
const create_td = (members, change, difference) => {
  const td = document.createElement('td');
  const tr = document.querySelector('tr');
  for (let i = 0; i < 3; i++) {
    td.setAttribute('class', table_class[i]);
    tr.appendChild(td);
  };
  document.getElementsByClassName('members').textContent = members;
  document.getElementsByClassName('change').textContent = change;
  document.getElementsByClassName('difference').textContent = difference;
}

// テーブルのid名とcontentを配列に格納
const table_id = ['members', 'change', 'difference'];
const table_header_content = ['名前', 'お釣り', '過不足'];

// テーブルヘッダーを作る関数
const create_th = () => {
  const table_header = document.getElementById('table_header');
  const th = document.createElement('th');
  for (let i = 0; i < 3; i++) {
    th.setAttribute('id', table_id[i]);
    table_header.appendChild(th);
    document.getElementById(table_id[i]).textContent = table_header_content[i];
  };
}

// テーブルを作る関数
const create_table = () => {
  create_tr();
  create_th();
  for (let i = 0; i < number.value; i++) {
    create_td(list_array[0][i],list_array[1][i],list_array[2][i]);
  }
}

// クリックしたら実行
document.getElementById('ok').addEventListener('click', function() {

  save_data();
  create_table();
  
})