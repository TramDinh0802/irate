const listRes = [{
        res_name: 'FRENCH GRILL',
        res_type: 'Grill',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '3000$',
        res_service: 4,
        res_clean: 5,
        res_food: 5,
        res_notes: 'JW MARRIOTT HOTEL HANOI'
    },
    {
        res_name: 'FRIDAYS GRILL',
        res_type: 'Grill',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '2500$',
        res_service: 5,
        res_clean: 5,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'DAIRY QUEEN',
        res_type: 'Fast Food',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '250$',
        res_service: 3,
        res_clean: 5,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'BASKIN-ROBBINS',
        res_type: 'Fast Food',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '200$',
        res_service: 4,
        res_clean: 3,
        res_food: 5,
        res_notes: 'OK'
    },
    {
        res_name: 'HANOI OCEAN HOUSE',
        res_type: 'Sea Food',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '200$',
        res_service: 4,
        res_clean: 3,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'HAI SAN SEAFOOD HANOI',
        res_type: 'Sea Food',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '150$',
        res_service: 3,
        res_clean: 4,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'DOWNTOWN CAFE & RESTAURANT',
        res_type: 'Cafe',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '150$',
        res_service: 4,
        res_clean: 3,
        res_food: 3,
        res_notes: 'OK'
    },
    {
        res_name: 'VIVIENCE CAFE RESTAURANT',
        res_type: 'Cafe',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '10$',
        res_service: 4,
        res_clean: 3,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'MARIS LOTTE',
        res_type: 'Buffet',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '225$',
        res_service: 3,
        res_clean: 4,
        res_food: 4,
        res_notes: 'OK'
    },
    {
        res_name: 'POSEIDON',
        res_type: 'Buffet',
        res_date: '08/02/2020',
        res_time: '16:15',
        res_averageprice: '315$',
        res_service: 5,
        res_clean: 4,
        res_food: 3,
        res_notes: 'OK'
    },
]

var db;
var request = window.indexedDB.open("Restaurant-Database", 2);
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("RestaurantDatabase", { keyPath: "id", autoIncrement: true });
    for (var i in listRes) {
        objectStore.add(listRes[i])
    }
}

request.onsuccess = function(event) {
    db = request.result;
    console.log("Success: " + db);
}

function getAllData(collectionName) {
    const transaction = db.transaction([collectionName], "readonly");
    const objectStore = transaction.objectStore(collectionName);
    request = objectStore.getAll();
    return request;
}

function createFeedback(feedback) {
    const request = db.transaction(["RestaurantDatabase"], "readwrite").objectStore("RestaurantDatabase").add(feedback)
    request.onsuccess = function(event) {
        $('#list_data').empty()
        loadAllData()
        alert("Create feedback successfully")
    }
    request.onerror = function(event) {
        alert("create feedback fail")
    }
}

function deleteFeedback(feedbackId) {
    feedbackId = Number(feedbackId)
    return db.transaction(["RestaurantDatabase"], "readwrite").objectStore("RestaurantDatabase").delete(feedbackId)
}

function getDetail(feedbackId) {
    feedbackId = Number(feedbackId)
    return db.transaction(["RestaurantDatabase"], "readwrite").objectStore("RestaurantDatabase").get(feedbackId)
}