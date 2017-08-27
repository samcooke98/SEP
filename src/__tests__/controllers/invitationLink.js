

// describe('Test the removeComment method', () => {
//     let comment;
//     beforeAll(() => {
//         mongoose.connect(testDBURL);
//     });
//     beforeEach(() => {
//         comment = new CommentModel(testData.normalComment);
//         return comment.save();
//     });
//     afterEach(() => {
//         return CommentModel.removeComments();
//     });
//     afterAll((done) => {
//         mongoose.disconnect(done);
//     });
// };

describe("A sample test", () => { 
    it("Should succeed", () => { 
        expect( true).toBe(true);
    })
}) 