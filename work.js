// 合計金額と人数を取得
const number = document.getElementById('number');
const price = document.getElementById('price');


let show_form = false;

// 人数に応じて記名欄を追加
const create_form = () => {
  
  const payment_average = Number((price.value - (price.value % number.value)) / number.value);
  document.getElementById('each_pay').textContent = `ひとりあたりの支払い金額は${payment_average}円です。余りは${Number(price.value % number.value)}円です。`;

  for (let i = 1; i - 1 < number.value; i++) {

    const member_element = document.getElementById('member');
    const new_member = document.createElement('li');
    new_member.textContent = `メンバー${i}：`;

    const member_inp = document.createElement('input');
    member_inp.setAttribute('type', 'text');
    member_inp.setAttribute('class', 'form names');
    member_inp.setAttribute('placeholder', '名前');
    member_inp.setAttribute('id', `member${i}`);

    const member_pay = document.createElement('input');
    member_pay.setAttribute('type', 'number');
    member_pay.setAttribute('class', 'form pay');
    member_pay.setAttribute('placeholder', '支払い金額');

    member_element.appendChild(new_member);
    new_member.appendChild(member_inp);
    new_member.appendChild(member_pay);
  };

  show_form = true;
};

// okボタンを作る
const create_button = () => {

  const ok = document.getElementById('ok');
  const result_btn = document.createElement('input');
  result_btn.setAttribute('type', 'button');
  result_btn.setAttribute('value', '入力した配分で決定する');
  result_btn.setAttribute('id', 'result');
  
  ok.appendChild(result_btn);
};


// クリックしたら実行
document.getElementById('decide').addEventListener('click', function() {
  if (number.value === "" || price.value === "") {
    document.getElementById('each_pay').textContent = '未記入の項目があります。';
  } else if (show_form === false) {
    create_form();
    create_button();
  };
});

// マイナス以下の数値を空データに置き換える関数
const minus_cut = (num) => {
  if (num >= 0) {
    return num;
  } else {
    return 0;
  };
};

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
};

// tableのid名とcontentを配列に格納
const table_class = ['members', 'change', 'difference'];
const table_header_content = ['名前', 'お釣り', '過不足'];

// thを作る関数
const create_th = () => {
  const table_header = document.getElementById('table_header');
  for (let i = 0; i < table_class.length; i++) {
    const th = document.createElement('th');
    th.setAttribute('class', table_class[i]);
    table_header.appendChild(th);
    document.querySelector(`.${table_class[i]}`).textContent = table_header_content[i];
  };
};


const insert_data = (tr_id) => {
  for(let a = 0; a < table_class.length; a++) {
    for(let b = 0; b < table_class.length; b++) {
      const td = document.querySelector(`#tr${tr_id} td.${table_class[b]}`);
      td.textContent = list_array[b][a];
      console.log(b,a);
    };
  };
};

// tdを作る関数
const create_td = (tr_id) => {
  table_class.forEach(function(value) {
    const td = document.createElement('td');
    const tr = document.getElementById(`tr${tr_id}`);
    td.setAttribute('class', value);
    tr.appendChild(td);
  });
  insert_data(tr_id);
};

// trを作る関数
const create_tr = () => {
  for (let i = 0; i < number.value; i++) {
    const tbody = document.getElementById('details');
    const tr = document.createElement('tr');
    tr.setAttribute('id', `tr${i}`);
    tbody.appendChild(tr);
  };
};

// tableを作る関数
const create_table = () => {
  create_th();
  create_tr();
  for (let i = 0; i < number.value; i++) {
    create_td(i);
  };
};

// // クリックしたら実行
document.getElementById('ok').addEventListener('click', function() {
  
  save_data();
  create_table();
  
});