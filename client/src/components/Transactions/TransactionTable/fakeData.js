
function createData(no, users, buktiTransfer, remainingActive, statusUser, statusPayment) {
    return {
        no,
        users,
        buktiTransfer,
        remainingActive,
        statusUser,
        statusPayment,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}



export const rows = [
    createData(1, "Radif Ganteng", "images.jpg", "20/hari", "Active", "Approved"),
    createData(2, "Haris Rahman", "images.jpg", "20/hari", "Not Active", "Pending"),
    createData(3, "Muhammad Rydwan", "images.jpg", "20/hari", "Active", "Pending"),
    createData(4, "Haris", "images.jpg", "20/hari", "Active", "Approved"),
    createData(5, "Jack Kambey", "images.jpg", "20/hari", "Not Active", "Cancel"),
];
