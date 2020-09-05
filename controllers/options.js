const Option = require('../models/option');
var cron=require('node-cron');
//var em= require('../controllers/email');
module.exports = {
    new: newOption,
    create,
    index,
    show,
    edit,
    getChoices,
    deleteOption,
    showEditPage,
    updateOption,
    showChart
};

function newOption(req, res) {
    res.render('options/new');
}

function create(req, res) {
    const option = new Option(req.body);
    //option.user = req.user._id;
    option.save(function(err) {
        if (err) return res.render('options/new');
        res.redirect('/options');
    });

}

function index(req, res) {
    // Option.find({user: req.user._id}, function(err, options) {
    //     res.render('options/index', {options});
    // });

        Option.find({}, function(err, options) {
          //  em.sendEmail(options,'vijaybabu.srireddy@gmail.com');
        res.render('options/index', {options});
    });
}

// function show(req, res) {
//     res.render('options/show');
// }
function show(req, res) {
    // Option.find({user: req.user._id}, function(err, options) {
    //     res.render('options/show', {options});
    // });

        Option.find({}, function(err, options) {
        res.render('options/show', {options});
    });
}

// function addOption(req, res,) {
//     Option.find({user: req.user._id}, function(err, options) {
//         res.render('options/show', {options});
//     });
//   }

  // function addChoice(req, res) {
  //   Option.find({isChoice: true}, function(err, options) {
  //       res.render('options/show', {options});
  //   });
  // }
 //  function makeChoice(req, res) {
 //    const option = new Option(req.body);
 //   // option.user = req.user._id;
 //    option.isChoice = true;
 //    option.save(function(err) {
 //        if (err) return res.render('options/');
 //            res.render('options/show');
 //    });
 //
 // }

//  function edit(req, res) {
//   Option.findById(req.params.id, function(err, option) {
//     // Verify book is "owned" by logged in user
//         option.isChoice = true;
//         option.save(function(err) {
//             console.log('error while saving');
//         });
//     res.render('options/show', {option});
//   });
// }


function edit(req, res) {
    Option.findById(req.params.id, function (err, option) {
        // Verify book is "owned" by logged in user
        option.isChoice = true;
        // var date=new Date(option.date);
        // var datestr=''+date.getMinutes()+' '+date.getHours()+' '+date.getDate()+' '+(Number(date.getMonth())+1).toString()+' '+option.weekday;
        // console.log(datestr);
        // var task=cron.schedule(datestr,function () {
        //     console.log('job scheduled now');
        // });
        // task.start();
        option.save(function (err) {
            console.log('error while saving');
        });
    });
    Option.find({isChoice:true}, function(err, options) {
    // Verify book is "owned" by logged in user
    res.redirect('/options/show');
  });
}

function showEditPage(req,res) {
     Option.findById(req.params.id, function (err, option) {
        res.render('options/edit',{option});
     });
}

function updateOption(req,res) {
     Option.findByIdAndUpdate(req.params.id, req.body,function (err, option) {
            console.log('error while saving');
            res.redirect('/options');
    });

}

function deleteOption(req, res) {
     Option.findByIdAndDelete(req.params.id, req.body,function (err, option) {
            console.log('error while deleting');
            res.redirect('/options');
    });

  // Option.deleteOne({_id:req.params.id}, function (err, option) {
  //     console.log('deleted');
  //         });
  //       Option.find({}, function(err, options) {
  //       res.redirect('/options');
  // });

  // Option.deleteOne(req.params.id, function(err, option) {
  //   // Verify book is "owned" by logged in user
  //           console.log('error while deleting');
  //   res.render('options/show', {option});
  // });
}

 function getChoices(req, res) {
  Option.find({isChoice:true}, function(err, options) {
    // Verify book is "owned" by logged in user
    res.render('options/show', {options});
  });
}

function showChart(req, res) {
  Option.find({}, function(err, options) {
    // Verify book is "owned" by logged in user
    res.render('options/chart', {options});
  });
}


//   function createChoice(req, res,) {
//     // Option.deleteOne({user: req.user._id});
//     // res.render('/options');
//     const option = Option(req.body);
//     option.user = req.user._id;
//     option.save(function(err) {
//         if (err) return res.redirect('/options/show');
//         res.render('/options');
//     })
//     }
