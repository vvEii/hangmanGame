/* jshint esversion: 6 */
var limitTimes;
var score;
var wordAndDefinition;
var wordLength;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDBu2n-3bG7TSSrOjwtYvlpt1i7_THRcZ0",
  authDomain: "hangmangame-3b825.firebaseapp.com",
  databaseURL: "https://hangmangame-3b825.firebaseio.com",
  projectId: "hangmangame-3b825",
  storageBucket: "hangmangame-3b825.appspot.com",
  messagingSenderId: "287851990133"
};
firebase.initializeApp(config);

//Get a reference to the database service
var database = firebase.database();

function addWord(wordId,word,definition){
  database.ref('wordBank/' + wordId).set({
    word: word,
    definition: definition
  });
}

var model = {
  login:() => {
    let username = $("#usernameInput").val();
    let password = $("#passwordInput").val();

    database.ref().once("value", (snapshot) => {
      let users = snapshot.val().users;
      if( users === undefined){
        let para = document.createElement("p");
        let node = document.createTextNode("Username or Password is not match.");
        para.setAttribute("class","signUpWarning");
        para.appendChild(node);
        $("#passwordDiv").append(para);
      }else{
        let userAmount = users.length;
        for (let i = 0; i < userAmount; ++i){
          if (username === users[i].username){
            if(password === users[i].password){
                let userId = i;
                console.log(i);
                location.assign('game.html' + "?para1=" + username + "&para2=" + userId);
                break;
            } else{
              let para = document.createElement("p");
              let node = document.createTextNode("Username or Password is not match.");
              para.setAttribute("class","signUpWarning");
              para.appendChild(node);
              $("#passwordDiv").append(para);
              break;
            }
          }
        }
      }
    },function(error){
      console.log("Error: " + error.code);
    });

  },

  submit: () => {
    let username = $("#usernameInput").val();
    let password = $("#passwordInput").val();
    let confirmPassword = $("#confirmPassword").val();
    let regExp =  /^[0-9a-zA-Z]*$/;
    if(regExp.test(username) !== true){
      let para = document.createElement("p");
      let node = document.createTextNode("Username contained some wrong symbols.");
      para.setAttribute("class","signUpWarning");
      para.appendChild(node);
      $("#usernameDiv").append(para);
    }else if (password.length < 6){
      let para = document.createElement("p");
      let node = document.createTextNode("Password must be at least 6 digits.");
      para.setAttribute("class","signUpWarning");
      para.appendChild(node);
      $("#passwordDiv").append(para);
    }else{
      if ( password.length !== 0 && username.length !== 0){
        if ( password != confirmPassword){
          console.log(password);
          console.log(confirmPassword);
          let para = document.createElement("p");
          let node = document.createTextNode("Password confirmation doesn't match Password.");
          para.setAttribute("class","signUpWarning");
          para.appendChild(node);
          $("#confirmPasswordDiv").append(para);
        }else{
          //save into database
          model.checkUsername(username,password);
        }
      }else{
        let para = document.createElement("p");
        let node = document.createTextNode("Missing information!");
        para.setAttribute("class","signUpWarning");
        para.appendChild(node);
        $("#confirmPasswordDiv").append(para);
      }
    }




  },

  init: () => {
    limitTimes = 7;
    score = 0;
    model.getWord();
    $("#labelLimitTimes").text("limit Times Left: ");
    $("#labelScore").text("Your Score: ");
    $("#limitTimes").text(limitTimes);
    $("#currentScore").text(score);
  },

  checkUsername: (username,password) =>{
      database.ref().once("value", (snapshot) => {
        let users = snapshot.val().users;
        if( users != null){
          let userAmount = users.length;
          let usernames = [];
          for (let i = 0; i < userAmount; ++i){
            usernames.push(users[i].username);
          }
          if (usernames.includes(username) === true){
            let para = document.createElement("p");
            let node = document.createTextNode("Username was already token!");
            para.setAttribute("class","signUpWarning");
            para.appendChild(node);
            $("#usernameDiv").append(para);
          }else {
            let userId = userAmount;
            let score = 0;
            model.saveUser(userId,username,password,score);
            location.assign('game.html' + "?para1=" + username + "&para2=" + userId);
          }
        }else{
          let userId = 0;
          let score = 0;
          model.saveUser(userId,username,password,score);
          location.assign('game.html' + "?para1=" + username + "&para2=" + userId);
        }
      }, function(error){
        console.log("Error: " + error.code);
      });
  },

  //save user into database when user click the "submit" button
  saveUser: (userId,user, pw, score)=> {
    database.ref('users/' + userId).set({
      id: userId,
      username: user,
      password: pw,
      score: score
    });
  },

  rank: () => {
    let queryString = decodeURIComponent(window.location.search);
    let vars = queryString.split("&");
    let var1 = vars[0].split("=");
    let var2 = vars[1].split("=");
    let username = var1[1];
    let userId = var2[1];
    console.log(username);
    console.log(userId);
    database.ref().child('/users/' + userId).update({
      score: score,
    });
    //navigate to the rank page
    location.assign('rank.html' + "?para1=" + username + "&para2=" + userId);
  },

  rankList: () => {
    let queryString = decodeURIComponent(window.location.search);
    let vars = queryString.split("&");
    let var1 = vars[0].split("=");
    let var2 = vars[1].split("=");
    let username = var1[1];
    let userId = var2[1];
    console.log(userId);
    console.log(username);
    database.ref().once("value", (snapshot) =>{
      let users = snapshot.val().users;
      let userAmount = users.length;
      users.sort((user1,user2) => {
        return user2.score - user1.score;
      });
      for( let i = 0; i < userAmount; ++i){
        let th = document.createElement("th");
        th.setAttribute("scope","row");
        let nodeTh = document.createTextNode(i + 1);
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let nodeId = document.createTextNode(users[i].id);
        let tdUser = document.createElement("td");
        let nodeUser = document.createTextNode(users[i].username);
        let tdScore = document.createElement("td");
        let nodeScore = document.createTextNode(users[i].score);
        th.append(nodeTh);
        tdId.append(nodeId);
        tdUser.append(nodeUser);
        tdScore.append(nodeScore);
        tr.appendChild(th);
        tr.appendChild(tdId);
        tr.appendChild(tdUser);
        tr.appendChild(tdScore);
        $("tbody").append(tr);
      }
    });

  },
  //get words from firebase database based on word number that user choosed
  getWord: () => {
    $("#congratulation").empty();
    $("#btn-next").prop("disabled",false);

    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
      "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (let i = 0; i < alphabet.length; ++i){
      let id = alphabet[i];
      $("#"+id).prop("disabled", false);
    }

    database.ref().on("value",function(snapshot){
      let wordIndex = Math.floor((Math.random()* 9) + 0);
      wordAndDefinition = snapshot.val().wordBank[wordIndex];
      wordLength = wordAndDefinition.word.length;
      view.displayDefinition(wordAndDefinition.definition);
      view.displayUnderline(wordLength);
    },function(error){
      console.log("Error: " + error.code);
    });
  },

  checkInput: function(inputLetter) {
    var initScore = score;
    for (let i = 0; i < wordLength; ++i){
      if (wordAndDefinition.word[i] === inputLetter){
        view.displayLetter(i,inputLetter);
        score++;
        view.updateScore(score);
      }
    }

    if (score == initScore){
      limitTimes--;
      view.updateLimitTimes(limitTimes);
    }
    if(score == wordLength){
      controller.win();
    }
    if(limitTimes == 0){
      controller.lost();
    }
  },
};
