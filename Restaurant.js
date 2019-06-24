var menuItems = [
    {
      name: "Crusty garlic foccacia with melted cheese",
      cost: "105.00",
      course: "main course",
      menuDiv: ""
    },
    {
      name: "French fries",
      cost: "105.00",
      course: "entree",
      menuDiv: ""
    },
    {
      name: "Home country fries with herbs and chilli flakes",
      cost: "105.00",
      course: "appetizers",
      menuDiv: ""
    },
    {
      name: "Any soft drink",
      cost: "50.00",
      course: "beverages",
      menuDiv: ""
    },
    {
      name: "Vanilla scoop",
      cost: "80.00",
      course: "desserts",
      menuDiv: ""
    }
  ];

  var tableDetails = [
    {
      name: "Table-1",
      cost: 0,
      items: 0,
      tableDiv: "",
      orders: []
    },
    {
      name: "Table-2",
      cost: 0,
      items: 0,
      tableDiv: "",
      orders: []
    },
    {
      name: "Table-3",
      cost: 0,
      items: 0,
      tableDiv: "",
      orders: []
    }
  ];

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    var menuDivId = ev.target.id;
    var i;
    for (i = 0; i < menuItems.length; i++) {
      if (menuItems[i].menuDiv == menuDivId) {
        break;
      }
    }
    ev.dataTransfer.setData("pos", i);
  }

  function drop(ev) {
    ev.preventDefault();
    var menuPos = ev.dataTransfer.getData("pos");
    var targetTable = null;
    var i;
    for (i = 0; i < tableDetails.length; i++) {
      if (tableDetails[i].tableDiv == ev.target.id) {
        targetTable = tableDetails[i];
        break;
      }
    }
    if (!targetTable) return;
    addItemToTable(i, menuPos);
    recalculatePriceAndItems(i);
  }

  function createMenuCard(menuItemName, menuItemPrice, pos) {
    menuItems[pos].menuDiv = menuItemName.replace(/ /g, "-");

    var card = document.createElement("div");
    card.setAttribute("id", menuItems[pos].menuDiv);
    card.setAttribute("draggable", "true");
    card.setAttribute("ondragstart", "drag(event)");
    card.className = "card";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var cardMenuItemName = document.createElement("h4");
    cardMenuItemName.textContent = menuItemName;

    var cardMenuItemPrice = document.createElement("p");
    cardMenuItemPrice.appendChild(document.createTextNode(menuItemPrice));

    cardBody.appendChild(cardMenuItemName);
    cardBody.appendChild(cardMenuItemPrice);
    card.appendChild(cardBody);

    var menuItemsDiv = document.getElementById("menuitems");
    menuItemsDiv.appendChild(card);
  }

  function createTableCard(tableName, pos) {
    tableDetails[pos].tableDiv = tableName.replace(/ /g, "-");

    var card = document.createElement("div");
    card.setAttribute("ondrop", "drop(event)");
    card.setAttribute("ondragover", "allowDrop(event)");
    card.setAttribute("data-toggle", "modal");
    card.setAttribute("data-target", "#table-modal");
    card.setAttribute(
      "onclick",
      "populateTableDetails('" + tableDetails[pos].tableDiv + "')"
    );
    card.className = "card";

    var cardBody = document.createElement("div");
    cardBody.setAttribute("id", tableDetails[pos].tableDiv);
    cardBody.className = "card-body";

    var cardTableName = document.createElement("h4");
    cardTableName.textContent = tableName;

    var cardTableDetails = document.createElement("p");
    cardTableDetails.setAttribute("id", tableName + "-details");
    var cardTableDetailsNode = document.createTextNode(
      "Rs 0 | Total Items: 0"
    );
    cardTableDetails.appendChild(cardTableDetailsNode);

    cardBody.appendChild(cardTableName);
    cardBody.appendChild(cardTableDetails);
    card.appendChild(cardBody);

    var tableItemsDiv = document.getElementById("tableItems");
    tableItemsDiv.appendChild(card);
  }

  function loadMenuCards() {
    for (var i = 0; i < menuItems.length; i++) {
      createMenuCard(menuItems[i].name, menuItems[i].cost, i);
    }
  }

  function loadTableCards() {
    for (var i = 0; i < tableDetails.length; i++) {
      createTableCard(tableDetails[i].name, i);
    }
  }

  function searchMenuItems() {
    var menuItemDiv;
    var searchParam = document.getElementById("search-menu").value;

    if (searchParam == "") {
      for (var i = 0; i < menuItems.length; i++) {
        menuItemDiv = document.getElementById(menuItems[i].menuDiv);
        menuItemDiv.classList.remove("hide");
      }
      return;
    }

    searchParam = searchParam.toLowerCase();
    for (var i = 0; i < menuItems.length; i++) {
      menuItemDiv = document.getElementById(menuItems[i].menuDiv);
      if (
        menuItems[i].course.toLowerCase().indexOf(searchParam) != -1 ||
        menuItems[i].name.toLowerCase().indexOf(searchParam) != -1
      ) {
        menuItemDiv.classList.remove("hide");
      } else {
        menuItemDiv.classList.add("hide");
      }
    }
  }

  function searchTables() {
    var tableDiv;
    var searchParam = document.getElementById("search-table").value;

    if (searchParam == "") {
      for (var i = 0; i < tableDetails.length; i++) {
        tableDiv = document.getElementById(tableDetails[i].tableDiv);
        tableDiv.classList.remove("hide");
      }
      return;
    }

    searchParam = searchParam.toLowerCase();
    for (var i = 0; i < tableDetails.length; i++) {
      tableDiv = document.getElementById(tableDetails[i].tableDiv);
      if (tableDetails[i].name.toLowerCase().indexOf(searchParam) != -1) {
        tableDiv.classList.remove("hide");
      } else {
        tableDiv.classList.add("hide");
      }
    }
  }

  function addItemToTable(tablePos, menuPos) {
    console.log("here");
    var i = 0;
    var found = false;
    if (
      tableDetails[tablePos].orders &&
      tableDetails[tablePos].orders.length > 0
    ) {
      for (i = 0; i < tableDetails[tablePos].orders.length; i++) {
        if (tableDetails[tablePos].orders[i].menuPos == menuPos) {
          found = true;
          break;
        }
      }
    }
    if (found) {
      if (tableDetails[tablePos].orders[i].count)
        tableDetails[tablePos].orders[i].count =
          tableDetails[tablePos].orders[i].count + 1;
    } else {
      tableDetails[tablePos].orders.push({
        menuPos: menuPos,
        count: 1
      });
    }
  }

  function recalculatePriceAndItems(tablePos) {
    console.log("recalculating!");
    var tableDetailsDiv = document.getElementById(
      tableDetails[tablePos].tableDiv + "-details"
    );
    var totalPriceAtTable = document.getElementById("totalPriceAtTable");
    var totalPrice = 0;
    var totalItems = 0;
    for (var i = 0; i < tableDetails[tablePos].orders.length; i++) {
      var menuPrice =
        menuItems[tableDetails[tablePos].orders[i].menuPos].cost;
      totalPrice =
        totalPrice + menuPrice * tableDetails[tablePos].orders[i].count;
      totalItems = parseInt(totalItems) + parseInt(tableDetails[tablePos].orders[i].count);
    }
    var cardTableDetailsNode = document.createTextNode(
      "Rs " + totalPrice + " | Total Items: " + totalItems
    );
    tableDetailsDiv.replaceChild(
      cardTableDetailsNode,
      tableDetailsDiv.childNodes[0]
    );
    if(totalPriceAtTable != null)
      totalPriceAtTable.textContent ="Total:"+totalPrice;
    console.log(tableDetails[tablePos]);
    tableDetails[tablePos].cost = totalPrice;
  }

  function updateOrderCount(tableAndMenu) {
    var details = tableAndMenu.split('|');
    var newCount = document.getElementById(tableAndMenu).value;
    if(newCount>=0)
      tableDetails[details[0]].orders[details[1]].count = newCount;
    recalculatePriceAndItems(details[0]);
  }

  function populateTableDetails(tableID) {
    
    var itemDetails = document.getElementById("items-details");
    var modalHeading = document.getElementById("modal-title");

    modalHeading.innerHTML = "";
    itemDetails.innerHTML = "";

    var currentTable;
    var tableIter;
    for (tableIter = 0; tableIter < tableDetails.length; tableIter++)
      if (tableDetails[tableIter].tableDiv == tableID) {
        currentTable = tableDetails[tableIter];
        break;
      }
        
    modalHeading.innerText = currentTable.name + " | Order Details";
    var table = document.getElementById("items-details");

    var totalPriceAtTable = document.createElement("p");
    totalPriceAtTable.setAttribute('id','totalPriceAtTable');
    
    var generateBill = document.createElement("input");
    generateBill.setAttribute('id', "generateBill");
    generateBill.type = 'button';
    generateBill.value = "Generate Bill";
    generateBill.onclick = function generateBillForTable(){
      console.log(tableIter + "Generating bill for table " + tableID );
      var bill = tableDetails[tableIter].cost;
      tableDetails[tableIter].cost = 0;
      tableDetails[tableIter].orders = [];
      recalculatePriceAndItems(tableIter);
      alert("Your bill is "+bill+" Rs");
    }

    for (var i = 0; i < currentTable.orders.length; i++) {
      var row = document.createElement("tr");
      row.setAttribute('id', "rowNumber-"+i);

      var sno = document.createElement("td");
      sno.setAttribute('scope', 'row');
      sno.textContent = i + 1;

      var menuItem = menuItems[currentTable.orders[i].menuPos];

      var item = document.createElement("td");
      item.textContent = menuItem.name;

      var itemCost = document.createElement("td");
      itemCost.textContent = menuItem.cost;

      var countPicker = document.createElement("input");
      countPicker.type = 'number';
      countPicker.setAttribute('id', tableIter + '|' + i);
      countPicker.setAttribute('onchange', 'updateOrderCount("' + tableIter + '|' + i + '")');
      console.log(currentTable.orders[i].count);
      countPicker.value = currentTable.orders[i].count;

      var removeItem = document.createElement("input");
      removeItem.setAttribute('id',"remove-"+i);
      removeItem.type = 'button';
      removeItem.value = 'Delete Order';
      removeItem.onclick = function removeItemFromOrder(){
         var removeRowDetails = this.id.split("-");         
         var itemCount = document.getElementById(tableIter + '|' + removeRowDetails[1]);
         itemCount.value = 0;
         tableDetails[tableIter].orders[removeRowDetails[1]].count = 0;
         recalculatePriceAndItems(tableIter);
         var rowToBeDeleted = document.getElementById("rowNumber-"+removeRowDetails[1]);
         table.removeChild(rowToBeDeleted);
        };

      row.appendChild(sno);
      row.appendChild(item);
      row.appendChild(itemCost);
      row.appendChild(countPicker);
      row.appendChild(removeItem);
      table.appendChild(row);
    }
    table.appendChild(totalPriceAtTable);
    recalculatePriceAndItems(tableIter);
    table.appendChild(generateBill);
  }

