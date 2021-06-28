
var message = document.getElementById('message');
var sendButton = document.getElementById('send-btn');

//По нажатию на кнопку отправить отправить на сервер nickname:message
sendButton.addEventListener('click', sendUserMessage);


start();

//Каждие 500 милисекунд забирать сообщения
function start() {
  getMessagesFromServer();
  setInterval(getMessagesFromServer, 2000);
}

var lastMessages = [];
//Шаг 1
//Получать сообщения с сервера
async function getMessagesFromServer() {
  //Получаем асинхроний ответ
  var response = await fetch('https://fchatiavi.herokuapp.com/get/maksim/?offset=0&limit=10');
  //Декрдируем его из строки в обекти javascript
  response = await response.json();

if (response === null) {
  messages.innerHTML = "No messages";
  return;
}
  //Сформировать HTML месседжей
  var messagesHTML = fromMessegesHTML(response);
  //Добавить в messages-wrapper письма
  messages.innerHTML = messagesHTML;

  //Если сообщений больше чем в прошлий раз пролистать в низ
  if (lastMessages.lenght < response.lenght) {
    scrollToEnd();
  }

  //Запомнить сообщения
  lastMessages = response;
}

async function sendUserMessage() {
  //Получить что написал пальзователь в поле nickname
  var userNickname = document.getElementById('nickname-input').value;
  //Получать что написал пользователь в поле message
  var userMessage = document.getElementById('message-input').value;

  if (userNickname.length === 0) {
    alert("Ти должен ввести имя!");
    return;
  }
  if (userMessage.length === 0) {
    alert("Ти должен ввести сообщения!");
    return;
  }

  await fetch('https://fchatiavi.herokuapp.com/send/maksim/', {
    method: 'POST',
    body: JSON.stringify({
      Name:userNickname,
      Message: userMessage
    })
  });

  getMessagesFromServer();
}

//Сформировать HTML меседжей
function fromMessegesHTML(messages) {
  var allMessageHTML ='';
  for (var i = 0; i < messages.length; i++) {
    var messageData =messages[i];
    //Создать верстку меседжа
    var message = `
      <div class="message">
        <div class="message-nickname"> ${messageData.Name} </div>
        <div class="message-text"> ${messageData.Message} </div>
      </div>
    `
    allMessageHTML = allMessageHTML + message;
  }
  return allMessageHTML;
}
//Проскролить до конца
function scrollToEnd(){
  messages.scrollTop = messages.scrollHeigth;
}
