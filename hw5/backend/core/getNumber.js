const getNumber = () => {
    let rand = Math.random();
    while (rand < 0.01) rand = Math.random();
    return Math.floor(rand * 100);
};

export default getNumber;
