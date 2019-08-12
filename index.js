const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    // const pageNumber = 2;
    // const pageSize = 10;
    
    return await Course
    //   .find({author: 'Sams', isPublished: true})
      // .find({ $gte: 10, $lte: 20 })
      // .find({ price: { $in: [10, 15, 20] } })
      // .find()
      // .or([{author: 'Sams'}, {isPublished: true}])
      // .and([{author: 'Sams', isPublished: true}])
      // .find({author: /^Sams/})
      // .find({ author: /Sams$/i })
      // .find({ author: /.*Sams.*/i })
    //   .find({ name: /.*Node|Ang*/i })
    .find({ tags: { $in: /frontend/i }})
    
    //   .limit(10)
    //   .skip()
      .sort({name: 1})
      .select({name: 1, author: 1, tags: 1});
    //   .countDocuments();
  }

async function run(){
  const courses = await getCourses();
  console.log(courses);
}

run();