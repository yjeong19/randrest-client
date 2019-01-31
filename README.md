# MVP
----------------------------------------------------
### initial search engine -- uses Yelp Fusion API and searches can be done based on restaurant name or a category of food.
  * ![searchbar](./mvp_pics/searchbar.png)

### if you press search, it will show 50 search results from yelp. If you press randomize, it will randomly select a restaurant from the 50 search results. You can start by pressing randomize.
  * ![randomize](./mvp_pics/randomize.png)

### once you select a restaurant, it goes to a landing page that shows the address, yelp info (rating, price and address) as well as a number of liked and disliked on this website.
  * ![landing page](./mvp_pics/selection_landing.png)

### the like and dislike button triggers a call to server to findOneAndUpdate the likes field in the backend.
  * ![like/dislike](./mvp_pics/like_percentage.png)

### comment section -- needs finishing based on user private routes. can leave comment and comments will be displayed on the restaurant's page as well as user's page
  * ![comment](./mvp_pics/comment_section.png)

### register or login in order to leave a comment
  * ![register](./mvp_pics/login.png)

### user page will have a list of comments that can be deleted
  * ![beforedelete](./mvp_pics/beforedelete.png)

### if user deletes the comment from the userpage, it will remove from restaurant as well as user's page.

  * ![usercomment](./mvp_pics/usercomment.png)

---------------------------------------------------
login token will expire after 1 day and is stored in Cookies.

- in order to register, you need to provide a email (can be fake) and a password.

- password is hashed using bcrypt and actual password is never saved.

---------------------------------------------------
## STACK
* YELP API
* React - front end
* Redux - state management
* Node/Express - back end
* MongoDB/Mongoose -DB


--------------------------------------------------
#### Errors I encountered
1. ~~babel loader in react-scripts were missing~~
2. ~~CORS issues~~
    * used cors middleware, or could add headers in request
3. [Resolved] ![npm error message Package issues](./error_pics/npmError.png)
    * dev dependencies in client package.json was messed up.
4. ~~axios promise function was returning undefined when moved to a helper function in /client/controlelr/yelp_api.js~~
    * needed to return axios method in same line.
5. ~~Mongoose's findOneAndUpdate() is executing Mongo's FindAndModify()~~
    * set ('useFindAndModify', false)
6. ~~Mongoose/Mongo findOneAndUpdate {upsert: true} is replacing an exisiting object instead of creating a new one when field does not exist.~~
    * moving condition to restaurant_id instead of nesting as restaurant{
      id: 'yelp-id'
    } seemed to fix findOneAndUpdate. -- now it creates new if object DNE, otherwise, just updates/ doesnt do anything.
7. ~~Mongoose cast to string error:~~
    * ![cast to stringError](./error_pics/mongoose_unhandeledPromiseRejectionError.png)
        * had type: string in restaurant Models. --> (https://github.com/Automattic/mongoose/issues/4181)
8. ~~Mongoose findOneAndUpdate not updating nested comments.~~
    * ~~creating a comments model, is this better option?~~
        * instead of creating new model, just put comments as part of restaurant instead of nesting.
