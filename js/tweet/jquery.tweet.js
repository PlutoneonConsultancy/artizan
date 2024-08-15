import "./js/tweet/index.css";

class ChatMessage {
  contrstructor(userName, message) {
    this.userName = userName;
    this.message = message;
  }
  getUserName() {
    return this.userName;
  }
  getMessage() {
    return this.message;
  }
}

class UserInfo {
  constructor(name) {
    this.name = name;
  }
  setPosition(value) {
    this.position = value;
  }
  getPosition() {
    return this.position;
  }
}

class UserManagement {
  constructor() {
    this.users = {};
    this.usersLimit = 2;
    this.lastPosition = null;
  }
  addUser(name) {
    var newUser = new UserInfo(name);
    if (!this.lastPosition) {
      this.lastPosition = "R";
      newUser.setPosition("R");
    } else {
      this.lastPosition = "L";
      newUser.setPosition("L");
    }
    this.users[name] = newUser;
  }
  getUser(name) {
    return this.users[name];
  }
}

class Chat {
  constructor(element, title) {
    this.title = title;
    this.messages = [];
    this.rootElement = element;
    this.userName = "A.";
    this.setWidth(400);

    this.userManagement = new UserManagement();

    this.createChatComponent();
  }
  setWidth(width) {
    this.width = width;
    this.rootElement.style.width = this.width + "px";
  }
  postMessage(userName, message) {
    var _userName;
    if (!userName) {
      _userName = this.userName;
    } else {
      _userName = userName;
    }

    var newMessage = new ChatMessage(_userName, message);
    this.messages.push(newMessage);

    var userPosition = null;
    var userInfo = this.userManagement.getUser(_userName);

    if (userInfo) {
      userPosition = userInfo.getPosition();
    } else {
      this.userManagement.addUser(_userName);
      userInfo = this.userManagement.getUser(_userName);
      userPosition = userInfo.getPosition();
    }

    this.createMessageComponent(_userName, message, userPosition);
    this.clearTextArea();
  }
  onPostMessage() {}
  createMessageComponent(userName, message, position) {
    if (message) {
      var _chatMessageElement = document.createElement("div");
      var _chatMessageContentElement = document.createElement("div");
      var _chatMessageUserNameElement = document.createElement("h5");
      var _chatMessageCommentsElement = document.createElement("div");

      _chatMessageElement.classList.add("comment");
      _chatMessageElement.classList.add("item");
      _chatMessageContentElement.classList.add("content");
      _chatMessageCommentsElement.classList.add("text");

      if (position == "R") {
        _chatMessageCommentsElement.classList.add("right");
        _chatMessageCommentsElement.style.float = "right";
        _chatMessageUserNameElement.style.textAlign = "right";
      } else {
        _chatMessageCommentsElement.classList.add("left");
        _chatMessageCommentsElement.style.float = "left";
        _chatMessageUserNameElement.style.textAlign = "left";
      }

      _chatMessageCommentsElement.style.width = 0.8 * (this.width - 40) + "px";

      _chatMessageUserNameElement.innerText = userName;
      _chatMessageCommentsElement.innerText = message;

      _chatMessageElement.appendChild(_chatMessageContentElement);
      _chatMessageContentElement.appendChild(_chatMessageUserNameElement);
      _chatMessageContentElement.appendChild(_chatMessageCommentsElement);

      this.chatMessages.appendChild(_chatMessageElement);
      _chatMessageElement.scrollIntoView();
    }
  }

  clearTextArea() {
    this.chatTextArea.value = "";
  }
  getMessage() {
    return this.chatTextArea.value;
  }
  createChatComponent() {
    if (!this.rootElement) {
      return;
    }

    var chatTitleElement = document.createElement("div");
    var chatTitleIconElement = document.createElement("i");
    var chatTitleHeadingElement = document.createElement("h1");

    var chatMessagesWrapperElement = document.createElement("div");
    var chatMessagesContentElement = document.createElement("div");

    var chatMessagesBoxElement = document.createElement("div");
    var chatMessagesTextAreaElement = document.createElement("textarea");
    var chatMessagesButtonElement = document.createElement("button");
    var chatMessagesButtonIconElement = document.createElement("i");
    var chatMessagesButton2Element = document.createElement("button");

    this.rootElement.classList.add("chat");
    this.rootElement.classList.add("dev-chat");

    chatTitleElement.classList.add("chat-title");
    chatTitleElement.classList.add("dev-chat-title");

    chatMessagesWrapperElement.classList.add("messages");
    chatMessagesWrapperElement.classList.add("dev-messages");
    chatMessagesWrapperElement.classList.add("ui");
    chatMessagesWrapperElement.classList.add("comments");
    chatMessagesWrapperElement.classList.add("divided");
    chatMessagesWrapperElement.classList.add("items");
    chatMessagesWrapperElement.tabIndex = 0;
    this.chatMessages = chatMessagesWrapperElement;

    chatMessagesBoxElement.classList.add("message-boxes");
    chatMessagesTextAreaElement.classList.add("message-input");

    chatMessagesBoxElement.align = "right";
    chatMessagesTextAreaElement.placeholder = "Type your message...";
    chatMessagesTextAreaElement.style.width = "100%";

    chatMessagesTextAreaElement.style.marginRight = "10px";
    chatMessagesTextAreaElement.style.border = "0px";
    chatMessagesTextAreaElement.style.minWidth = "80%";
    chatMessagesTextAreaElement.style.minHeight = "35px";
    chatMessagesTextAreaElement.rows = 2;
    this.chatTextArea = chatMessagesTextAreaElement;

    chatMessagesButtonElement.classList.add("ui");
    chatMessagesButtonElement.classList.add("primary");
    chatMessagesButtonElement.classList.add("button");
    chatMessagesButtonElement.classList.add("circular");
    chatMessagesButtonElement.classList.add("full-circle");
    chatMessagesButtonElement.style.minWidth = "35px";
    chatMessagesButtonElement.style.minHeight = "32px";
    chatMessagesButtonElement.style.padding = "0px";
    chatMessagesButtonElement.style.margin = "0px";

    chatMessagesButtonIconElement.classList.add("paper");
    chatMessagesButtonIconElement.classList.add("plane");
    chatMessagesButtonIconElement.classList.add("icon");
    chatMessagesButtonIconElement.style.width = "15px";
    chatMessagesButtonIconElement.style.height = "15px";
    chatMessagesButtonIconElement.style.margin = "0px";

    chatTitleIconElement.classList.add("comments");
    chatTitleIconElement.classList.add("icon");
    chatTitleIconElement.classList.add("big");
    chatTitleHeadingElement.innerHTML = this.title;

    chatMessagesButtonElement.type = "submit";
    chatMessagesButtonElement.title = "Send";
    chatMessagesButtonElement.appendChild(chatMessagesButtonIconElement);

    chatTitleElement.appendChild(chatTitleIconElement);
    chatTitleElement.appendChild(chatTitleHeadingElement);

    this.rootElement.appendChild(chatTitleElement);
    chatMessagesWrapperElement.appendChild(chatMessagesBoxElement);

    this.rootElement.appendChild(this.chatMessages);

    this.rootElement.appendChild(chatMessagesBoxElement);
    chatMessagesBoxElement.appendChild(chatMessagesTextAreaElement);
    chatMessagesBoxElement.appendChild(chatMessagesButtonElement);
    debugger;
    var _this = this;
    chatMessagesButtonElement.onclick = function() {
      var message = _this.getMessage();
      _this.postMessage(null, message);
      _this.chatTextArea.focus();
    };
  }
}

var newChatElement = document.querySelector("#chatApp");
var chat = new Chat(newChatElement, "Virtual Assistant");
window.chat = chat;
