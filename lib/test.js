"use strict";



var test = {};

test.runTests = function() {
  var time = parseInt(Date.now());
  test.title("Simple object commands");
  test.assertCmd("get coin", "You try to pick up the coin, but it just will not budge.");
  test.assertCmd("get straw boater", "Kyle has it.");
  test.assertCmd("get cabinet", "You can't take it.");
  test.assertCmd("get knife", "You have it.");

  test.title("Simple object commands (boots)");
  test.assertCmd("wear boots", "You don't have them.");
  test.assertCmd("remove boots", "You're not wearing them.");
  test.assertCmd("get boots", "You take the boots.");
  test.assertCmd("get boots", "You have them.");
  test.assertCmd("wear boots", "You put on the boots.");
  test.assertCmd("wear boots", "You're wearing them.");
  test.assertCmd("remove boots", "You take the boots off.");
  test.assertCmd("drop boots", "You drop the boots.");
  
  test.title("Simple object commands (book)");
  test.assertCmd("get the book", "You take the book.");
  test.assertCmd("read the book", "It is not in a language you understand.");
  test.assertCmd("drop book", "You drop the book.");

  test.title("NPC commands");
  test.assertCmd("kyle,get coin", "He tries to pick up the coin, but it just will not budge.");
  test.assertCmd("kyle,get knife", "You have it.");
  test.assertCmd("kyle,get cabinet", "Kyle can't take it.");
  test.assertCmd("kyle,get cover", "Kyle can't take it; it's part of the book.");

  test.title("NPC commands (boots)");
  test.assertCmd("kyle, wear boots", "He doesn't have them.");
  test.assertCmd("kyle, remove boots", "He's not wearing them.");
  test.assertCmd("kyle, get boots", "Kyle takes the boots.");
  test.assertCmd("kyle, get boots", "Kyle has them.");
  test.assertCmd("kyle, wear boots", "Kyle puts on the boots.");
  test.assertCmd("kyle, wear boots", "He's wearing them.");
  test.assertCmd("kyle, remove boots", "Kyle takes the boots off.");
  test.assertCmd("kyle, drop boots", "Kyle drops the boots.");

  test.title("NPC commands (book)");
  test.assertCmd("tell kyle to get the book", "Kyle takes the book.");
  test.assertCmd("tell kyle to read the book", "It is not in a language he understands.");
  test.assertCmd("tell kyle to drop the book", "Kyle drops the book.");

  test.title("NPC commands (torch)");
  test.assertCmd("kyle, get torch", "Kyle takes the flashlight.");
  test.assertEqual(false, w.flashlight.switchedon);
  test.assertCmd("kyle, turn on the torch", "Kyle switches the flashlight on.");
  test.assertEqual(true, w.flashlight.switchedon);
  test.assertCmd("kyle, turn the torch off", "Kyle switches the flashlight off.");
  test.assertEqual(false, w.flashlight.switchedon);
  test.assertCmd("kyle, drop torch", "Kyle drops the flashlight.");

  test.title("NPC commands (go)");
  test.assertCmd("kyle, go e", "Kyle heads east.");
  test.assertCmd("kyle, get torch", "Nothing called 'kyle' here.");
  
  
  test.assertCmd("get torch", "You take the flashlight.");
  test.assertCmd("get garage", "You take the garage key.");
  
  test.assertCmd("e", ["A clean room.", "You can see a trapdoor, a camera, Kyle (wearing a straw boater), a big kitchen table and a garage door here.", "You can go north or west.", "A fresh smell here!"]);
  test.assertCmd("kyle,n", "Kyle tries the garage door, but it is locked.");
  
  test.assertCmd("kyle,get all", ["Trapdoor: Kyle can't take it.", "Camera: Kyle takes the camera.", "Big_kitchen_table: Kyle can't take it.", "Garage_door: Kyle can't take it."]);
  test.assertCmd("kyle, drop picture box", "Kyle drops the camera.");
  test.assertCmd("kyle, open trapdoor", "Kyle opens the trapdoor.");
  test.assertCmd("kyle, down", "You watch Kyle disappear through the trapdoor.");

  test.title("The charger");
  test.assertCmd("open garage", ["You unlock the garage door.", "You open the garage door."]);
  test.assertCmd("n", ["An empty garage.", "You can see a garage door (open) and a charger here.", "You can go south."]);
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is closed.");
  test.assertCmd("push button", "You push the button, but nothing happens.");
  test.assertCmd("put torch in compartment", "The compartment is closed.");
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is closed.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.");
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is open.");
  test.assertCmd("put torch in compartment", "Done.");
  test.assertCmd("put key in compartment", "The compartment is full.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment contains a flashlight.");
  test.assertCmd("push button", "You push the button, but nothing happens.");
  test.assertCmd("close compartment", "You close the compartment.");
  test.assertCmd("push button", "You push the button. There is a brief hum of power, and a flash.");
  test.assertCmd("get torch", "It is inside the compartment.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("get torch", "You take the flashlight.");

  test.assertCmd("open compartment", "It already is.");
  test.assertCmd("put knife in compartment", "Done.");
  test.assertCmd("close compartment", "You close the compartment.");
  test.assertCmd("push button", "There is a loud bang, and the knife is destroyed.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.");

  
  test.results (time);
}  



test.testing = false;
test.testOutput = [];
test.totalCount = 0;
test.failCount = 0;
test.subCount = 0;
test.currentTitle = "Not specified";

test.title = function(title) {
test.subCount = 0;
  test.currentTitle = title;
}

test.printTitle = function() {
  debugmsg(DBG_TEST, test.currentTitle + ": Error (test " + test.subCount + ")");
  test.failCount++;
}

test.assertCmd = function(cmdStr, expected) {
  test.totalCount++;
  test.subCount++;
  if (typeof expected === "string") {
    expected = [expected];
  }
  test.testing = true;
  test.testOutput = [];
  parser.parse(cmdStr);
  test.testing = false;
  
  if (test.testOutput.length === expected.length && test.testOutput.every(function(value, index) { return value === expected[index]})) {
    //debugmsg(DBG_TEST, ".");
  }
  else {
    test.printTitle();
    for (var i = 0; i < test.testOutput.length; i++) {
      if (expected[i] !== test.testOutput[i]) {
        debugmsg(DBG_TEST, "Expected: " + expected[i]);
        debugmsg(DBG_TEST, "...Found: " + test.testOutput[i]);
      }
    }
  }
};


test.assertEqual = function(expected, found) {
  test.totalCount++;
  test.subCount++;
  if (expected === found) {
    //debugmsg(DBG_TEST, ".");
  }
  else {
    test.printTitle();
    debugmsg(DBG_TEST, "Expected: " + expected);
    debugmsg(DBG_TEST, "...Found: " + found);
  }
};

test.results = function(time) {
  var elapsed = parseInt(Date.now()) - time;
  debugmsg(DBG_TEST, "Number of tests: " + test.totalCount);
  debugmsg(DBG_TEST, "Number of fails: " + test.failCount);
  debugmsg(DBG_TEST, "Elapsed time: " + elapsed + " ms (" + (Math.round(elapsed / test.totalCount * 10) / 10) + " ms/test)");
};