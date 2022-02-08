// const orders = [
//     {
//     id: 1,
//     Parcel: {
//         description: "A laptop bag",
//         weight: 1.5,
//         value: 20000
//     },
//     Destination: {
//         receiversName: "Paul Smith",
//         address: "Okokomaiko, Abuja, Brazil",
//         phoneNumber: "08999999999"
//     },
//     Pickup: {
//         senderName: "Adefolaju Ariyo",
//         address: "Elebu, Osun State, Spain",
//         phoneNumber: "01844444444"
//     },
//     Status: "Pickup Requested",
//     DateCreated: "1st January, 2005",
//     Price: 20000

//     },
//     {
//         id: 1,
//         Parcel: {
//             description: "A Samsung television",
//             weight: 3,
//             value: 1000000
//         },
//         Destination: {
//             receiversName: "John Doe",
//             address: "Potato, Santa Monica, Brazil",
//             phoneNumber: "08999999999"
//         },
//         Pickup: {
//             senderName: "Adefolaju Ariyo",
//             address: "Dubai, Florida, Egypt",
//             phoneNumber: "01844444444"
//         },
//         Status: "Delivered",
//         DateCreated: "1st January, 2005",
//         Price: 40000

//         },
// ]

// let user = "Admin";

// let body = document.querySelector('#allParcelDisplay');

// orders.forEach((order) => {
//     if (user.toLowerCase() === "admin") {
//         body.innerHTML += ` <div class="profile-preview">
//         <h1> Sender: ${order.Pickup.senderName} </h1>
//         <h2> Description: ${order.Parcel.description} </h2>
//         <p> Date Created: ${order.DateCreated} </p>
//         <p> Status: ${order.Status} </p>
//         <p> Receiver: ${order.Destination.receiversName} </p>
//         <p> Destination: ${order.Destination.address} </p>
//         <p> Pickup Location: ${order.Pickup.address} </p>
//         <p> Price: #${order.Price} </p>
//         <button> <a href= "parcel.html" > View order </a></button>
//         <button> <a href=""> Update order </a> </button>
//         </div>
//         `;
//     } else {
//         body.innerHTML += ` <div class="profile-preview">
//         <h2> Description: ${order.Parcel.description} </h2>
//         <p> Date Created: ${order.DateCreated} </p>
//         <p> Status: ${order.Status} </p>
//         <p> Receiver: ${order.Destination.receiversName} </p>
//         <p> Destination: ${order.Destination.address} </p>
//         <p> Pickup Location: ${order.Pickup.address} </p>
//         <p> Price: #${order.Price} </p>
//         <button> <a href= "parcel.html" > View order </a></button>
//         </div>
//         `;
//     }

// });
