const makeName = (name, to) => {
    return [name, to].sort().join("_");
};
const Query = {
    chatbox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
        const name = makeName(name1, name2);
        console.log("querying: ", name);
        let box = await ChatBoxModel.findOne({ name: name });
        if (!box) box = await new ChatBoxModel({ name: name }).save();
        return box;
    },
};
export default Query;
