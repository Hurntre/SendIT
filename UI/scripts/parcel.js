// const order = {
//     id: 1,
//     Parcel: {
//         description: "A laptop bag",
//         weight: 1.5,
//         value: 20000
//     },
//     Destination: {
//         receiversName: "Adefolaju Ariyo",
//         address: "Okokomaiko, Abuja, Brazil",
//         phoneNumber: "08999999999"
//     },
//     Pickup: {
//         address: "Elebu, Osun State, Spain",
//         phoneNumber: "01844444444"
//     },
//     Status: "Picked Up",
//     DateCreated: "1st January, 2005"

//     };

// let body = document.querySelector('#parcelDisplay');

// if (order.Status.toLowerCase() === "enroute" || order.Status.toLowerCase() === "delivered") {
//     body.innerHTML += `
//     <h2> Description: ${order.Parcel.description} </h1>
//     <p> Date Created: ${order.DateCreated} </p>
//     <p> Status: ${order.Status} </p>
//     <p> Receiver: ${order.Destination.receiversName} <p>
//     <button> <a href= "allparcels.html" > Back </a></button>
//     `;
//     } else {
//     body.innerHTML += `
//     <h2> Description: ${order.Parcel.description} </h1>
//     <p> Date Created: ${order.DateCreated} </p>
//     <p> Status: ${order.Status} </p>
//     <p> Receiver: ${order.Destination.receiversName} <p>
//     <button> <a href=api/v1/parcels/parcel:${order.id}> Edit Order </a></button>
//     <button> <a href=api/v1/parcels/parcel:${order.id}> Cancel Order </a></button>
//     <button> <a href= "allparcels.html" > Back </a></button>

//     `;
// }
