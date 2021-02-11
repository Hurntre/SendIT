// let greetings = document.querySelector("h1");
// let deliveredCounterBlock = document.querySelector(".deliveredParcelsCounter");
// let inTransitCounterBlock = document.querySelector(".inTransitCounter");
// let deliveredCounter = 0;
// let inTransitCounter = 0;

// const User = {
//     Username : "Adefolaju Ariyo",
//     Parcels : [
//         {
//             id: 1,
//             Detail: {
//                 description: "A laptop bag",
//                 weight: 1.5,
//                 value: 20000
//             },
//             Destination: {
//                 receiversName: "Paul Smith",
//                 address: "Okokomaiko, Abuja, Brazil",
//                 phoneNumber: "08999999999"
//             },
//             Pickup: {
//                 address: "Elebu, Osun State, Spain",
//                 phoneNumber: "01844444444"
//             },
//             Status: "Pickup Requested",
//             DateCreated: "1st January, 2005",
//             Price: 20000
//         },
//         {
//             id: 2,
//             Detail: {
//                 description: "A Samsung television",
//                 weight: 3,
//                 value: 1000000
//             },
//             Destination: {
//                 receiversName: "John Doe",
//                 address: "Potato, Santa Monica, Brazil",
//                 phoneNumber: "08999999999"
//             },
//             Pickup: {
//                 address: "Dubai, Florida, Egypt",
//                 phoneNumber: "01844444444"
//             },
//             Status: "Delivered",
//             DateCreated: "1st January, 2005",
//             Price: 40000

//         },
//         {
//             id: 3,
//             Detail: {
//                     description: "A Range Rover Velar",
//                     weight: 1000,
//                     value: 90000000
//                 },
//                 Destination: {
//                     receiversName: "John Doe",
//                     address: "Potato, Santa Monica, Brazil",
//                     phoneNumber: "08999999999"
//                 },
//                 Pickup: {
//                     address: "Dubai, Florida, Egypt",
//                     phoneNumber: "01844444444"
//                 },
//                 Status: "Delivered",
//                 DateCreated: "1st January, 2005",
//                 Price: 10000000

//         },
//     ]
// };

// User.Parcels.forEach((parcel) => {
//     if (parcel.Status.toLowerCase() === "delivered") {
//         deliveredCounter += 1
//     } else {
//         inTransitCounter += 1
//     }

// });

// greetings.innerText += ` ${User.Username}`
// deliveredCounterBlock.innerText += ` ${deliveredCounter}`;
// inTransitCounterBlock.innerText += ` ${inTransitCounter}`;
