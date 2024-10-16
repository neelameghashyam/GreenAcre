import express from "express";
import cors from "cors";
import configDb from "./config/db.js";
import dotenv from 'dotenv';
import { checkSchema } from 'express-validator';
import { userRegisterSchema, userLoginSchema, userResetPassSchema, userForgotPassword, userResetForgetPassSchema } from "./app/validators/userValidators.js";
import { postValidationSchema } from "./app/validators/postValidators.js";
import { articleValidationSchema } from "./app/validators/articlesValidators.js";
import { auctionValidationSchema } from "./app/validators/auctionValidators.js";
import { bidderValidationSchema } from "./app/validators/biddersValidators.js";
import { paymentValidationSchema } from "./app/validators/paymentValidators.js";
import userCntrl from "./app/controllers/userCntrl.js";
import postCntrl from "./app/controllers/postCntrl.js";
import articleCntrl from "./app/controllers/articlesCntrl.js";
import auctionCntrl from "./app/controllers/auctionCntrl.js";
import bidderCntrl from "./app/controllers/biddersCntrl.js";
import paymentCntrl from "./app/controllers/paymentCntrl.js";
import authenticateUser from "./app/middlewares/authentication.js";
import authorization from './app/middlewares/authorization.js';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from "./app/middlewares/multer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 2002;

app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

configDb();

// User routes
app.post('/api/user/register', checkSchema(userRegisterSchema), userCntrl.register);
app.post("/api/user/login", checkSchema(userLoginSchema), userCntrl.login);
app.put('/api/user/edit',authenticateUser,userCntrl.edit)
app.put('/api/user/reset', checkSchema(userResetPassSchema), authenticateUser, userCntrl.resetPass);
app.get("/api/user/accounts", authenticateUser, userCntrl.account);//used for all accounts
app.get('/api/user/account',authenticateUser,userCntrl.myAccount)
app.post('/api/user/forget-password', checkSchema(userForgotPassword), userCntrl.forgotPassword);
app.put("/api/user/otp-verification", userCntrl.otpVerification);
app.put('/api/user/reset-forget-password', checkSchema(userResetForgetPassSchema), userCntrl.resetForgotPassword);
app.get('/api/user/:id',authenticateUser,userCntrl.OwnerAccount)
app.put('/api/user/role/:id',authenticateUser,authorization(['admin']),userCntrl.changeRole)
app.delete('/api/user/deleteUser/:id',authenticateUser,authorization(['admin']),userCntrl.destroy)


// Property routes
app.post('/api/property/post-property', upload.single('file'),checkSchema(postValidationSchema), authenticateUser, postCntrl.create);
app.put('/api/property/edit/:id', upload.single('file'), authenticateUser,authorization(["admin","moderator","user"]),checkSchema(postValidationSchema), postCntrl.edit);
app.delete('/api/property/post-delete/:id',authenticateUser, authorization(["admin","moderator","user"]), postCntrl.deletePost);
app.get("/api/property/posts", postCntrl.allPosts);
app.get('/api/property/post/:id',postCntrl.getPost);
app.put('/api/property/approve/:id',authenticateUser,authorization(['admin','moderator']),postCntrl.approvePosts)
app.put('/api/property/views/:id',postCntrl.views)
app.get('/api/property/my-properties', authenticateUser, postCntrl.allPostsOfUser);

// Article routes
app.post('/api/article/create', upload.single('file'), authenticateUser,authorization(["admin","moderator"]),checkSchema(articleValidationSchema),  articleCntrl.create);
app.put('/api/article/edit/:id', upload.single('file'), authenticateUser, authorization(["admin","moderator"]),checkSchema(articleValidationSchema), authenticateUser, articleCntrl.edit);
app.delete('/api/article/delete/:id', authenticateUser, authorization(["admin","moderator"]),articleCntrl.delete);
app.get('/api/article/get-all', articleCntrl.getAll);
app.get('/api/article/get/:id', articleCntrl.getArticle);


// Auction routes
app.post('/api/auction/create',upload.single('file'), checkSchema(auctionValidationSchema), authenticateUser, auctionCntrl.create);
app.put('/api/auction/edit/:id', upload.single('file'),authenticateUser,authorization(["admin","moderator","user"]),checkSchema(auctionValidationSchema),  auctionCntrl.edit);
app.delete("/api/auction/delete/:id", authenticateUser, authorization(["admin","moderator","user"]),auctionCntrl.delete);
app.get("/api/auction/all", auctionCntrl.getAll);
app.get('/api/auction/my-auctions', authenticateUser, auctionCntrl.getMyAuctions);
app.get('/api/auction/get/:id',auctionCntrl.get);
app.put('/api/auction/approve/:id',authenticateUser,authorization(['admin','moderator']),auctionCntrl.approveAuctions)
app.put('/api/auction/final-bid/:id', authenticateUser, authorization(["admin","moderator"]),checkSchema(auctionValidationSchema), authenticateUser, auctionCntrl.finalResults);

// Bidder routes
app.post('/api/bidder/create', authenticateUser, checkSchema(bidderValidationSchema), bidderCntrl.create);
app.put('/api/bidder/edit/:id', authenticateUser, checkSchema(bidderValidationSchema), bidderCntrl.edit);
app.delete('/api/bidder/delete/:id', authenticateUser, authorization(["admin","moderator"]),bidderCntrl.delete);
app.get('/api/bidder/get-all-of-auction/:id', authenticateUser, bidderCntrl.getAllOfAuction);
app.get('/api/bidder/get/:id', authenticateUser, bidderCntrl.getOne);
app.get('/api/bidder/:id', authenticateUser, bidderCntrl.bidded);

// Payment routes
app.post('/api/payment/create',authenticateUser,paymentCntrl.create);
app.put('/api/payment/edit/:id',authenticateUser,paymentCntrl.edit);
app.delete('/api/payment/delete/:id', authenticateUser, paymentCntrl.delete);
app.get('/api/payment/get-all', authenticateUser, paymentCntrl.getAll);
app.get('/api/payment/get/:id', authenticateUser, paymentCntrl.getOne);

app.listen(port, () => {
  console.log('Server is running at port No:', port);
});
