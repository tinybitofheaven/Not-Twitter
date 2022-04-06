const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Post');

router.post('/post', (req, res) => {
	const {listSlug, user, text, image, timestamp}  = req.body;
	const post = {user, text, image, timestamp};

	Post.findOneAndUpdate({slug:listSlug}, {$push: {items: listItem}}, (err, list, count) => {
    console.log(err);
		res.redirect(`/list/${listSlug}`);
	});
});

router.post('/check', (req, res) => {
	const {listSlug, items} = req.body;

	List.findOne({slug:listSlug}, (err, list, count) => {
    console.log(`items: ${items}, list: ${list}`);
		for (let i = 0; i < list.items.length; i++) {
      console.log(list.items[i]);
			if (items?.includes(list.items[i].name)) {
				list.items[i].checked = true;
			}
		}
		list.markModified('items');
		list.save((err, savedList, count) => {
      console.log(err);
			res.redirect(`/list/${listSlug}`);
		});
	});
});

module.exports = router;
