/* jshint esversion: 6 */
var view = {

  //display game home page after user login or sign up succeeded
  displayUser: () => {
    let queryString = decodeURIComponent(window.location.search);
    let vars = queryString.split("&");
    let var1 = vars[0].split("=");
    let var2 = vars[1].split("=");
    let username = var1[1];
    let userId = var2[1];
    //console.log(queryString);
    // //$("#cardDiv").hide();
    // $("#headerDiv").show();
    // $("#gameDiv").show();
    // $("#btn-div").empty();
    // $("#headerDiv").empty();
    let para = document.createElement("p");
    let node = document.createTextNode("You are signed in as ");
    let paraUser = document.createElement("p");
    paraUser.setAttribute("id", "usernameP");
    let nodeUser = document.createTextNode(username);

    para.setAttribute("class","signIn");
    para.appendChild(node);
    paraUser.setAttribute("class","user");
    paraUser.appendChild(nodeUser);
    para.append(paraUser);
    $("#title").append(para);
  },
  //display the definition of word
  displayDefinition: function(wordDefinition){
    let definition = wordDefinition;
    $("#labelDefinition").text("Definition: ");
    $("#definition").text(definition);
  },
  //load the game view
  displayAplhabet: function(){
    $("#alphabet-btn").empty();
    var positionAlphabet = document.getElementById("alphabet-btn");
    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
      "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (let i = 0; i < alphabet.length; ++i){
      let textContent = document.createTextNode(alphabet[i]);
      let btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-primary letter");
      btn.setAttribute("id", alphabet[i]);
      btn.appendChild(textContent);
      positionAlphabet.appendChild(btn);
    }
  },

  //display underlines
  displayUnderline: function(wordLength){
    $("#div-underline").empty();
    var positionUnderline = document.getElementById("div-underline");

    for (let i = 0; i < wordLength; ++i){
      let para = document.createElement("p");
      let node = document.createTextNode("_");
      para.setAttribute("class", "underline-p");
      para.setAttribute("id","underline" + i);
      para.appendChild(node);
      positionUnderline.appendChild(para);
    }
  },

  //display letter when user correct
  displayLetter: function(indexLetter, inputLetter){
    let positionLetter = document.getElementById("underline"+indexLetter);
    positionLetter.textContent = inputLetter;
  },

  //display the next word button
  displayNextBtn: () => {
    let btnNext = document.createElement("button");

    btnNext.setAttribute("id","btn-next");
    btnNext.setAttribute("class","btn btn-secondary");
    btnNext.setAttribute("onclick","model.getWord()");
    btnNext.textContent = "Next Word";
    $("#btn-div").append(btnNext);
  },

  //
  displayLogOutbtn: () => {

    let btnLogOut = document.createElement("button");

    btnLogOut.setAttribute("id","btn-logOut");
    btnLogOut.setAttribute("class","btn btn-danger");
    btnLogOut.setAttribute("onclick","controller.logOut()");
    btnLogOut.textContent = "Log Out";
    $("#btn-div").append(btnLogOut);
  },
  //restart the game when user click the restart button
  displayRestartBtn: () => {

    let btnRestart = document.createElement("button");
    btnRestart.setAttribute("id","btn-confirm");
    btnRestart.setAttribute("class","btn btn-info");
    btnRestart.setAttribute("onclick","model.init()");
    btnRestart.textContent = "Restart";

    $("#btn-div").append(btnRestart);
  },

  displayRankBtn: () => {
    let btnRank = document.createElement("button");
    btnRank.setAttribute("id","btn-rank");
    btnRank.setAttribute("class","btn btn-warning");
    btnRank.setAttribute("onclick","model.rank()");
    btnRank.textContent = "Rank";

    $("#btn-div").append(btnRank);
  },

  //update user's limit times
  updateLimitTimes: function(limitTimes){
    let limitTimeUpdated = limitTimes;
    document.getElementById('limitTimes').innerHTML = limitTimeUpdated.toString();
  },

  //update user's current score
  updateScore: function(score){
    let scoreUpdated = score;
    document.getElementById('currentScore').innerHTML = scoreUpdated.toString();
  },
};
