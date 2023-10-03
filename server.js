const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
var path = require("path");
var rfs = require("rotating-file-stream");
const mongoSanitize = require("express-mongo-sanitize");
const fileupload = require("express-fileupload");
const hpp = require("hpp");
var morgan = require("morgan");
const logger = require("./middleware/logger");
var cookieParser = require("cookie-parser");

// Router
const bannerRouters = require("./routes/Banners");
const contactRouters = require("./routes/Contact");
const faqRouters = require("./routes/Faqs");
const footerRouters = require("./routes/FooterMenu");
const galleryRouters = require("./routes/Gallery");
const imageUploadRouter = require("./routes/imageUpload");
const invoiceRouters = require("./routes/Invoice");
const menuRouters = require("./routes/Menu");
const newsRouters = require("./routes/News");
const newsCategoriesRouters = require("./routes/NewsCategories");
const orderRouters = require("./routes/Order");
const pageRouters = require("./routes/Pages");
const partnerRouters = require("./routes/Partner");
const payTypeRouters = require("./routes/Paytype");
const qpayRouters = require("./routes/Qpay");
const serviceRouters = require("./routes/Services");
const socialLinkRouters = require("./routes/SocialLink");
const tireRouters = require("./routes/Tire");
const tireMakeRouters = require("./routes/TireMake");
const tireModalRouters = require("./routes/TireModal");
const userRouters = require("./routes/Users");
const uploadRouters = require("./routes/imageUpload");
const webInfoRouters = require("./routes/WebInfo");
const fileRouters = require("./routes/File");
const wheelRouters = require("./routes/Wheel");
const wheelCategoriesRouter = require("./routes/WheelCategories");
const TireCategoriesRouter = require("./routes/TireCategories");
const SetProductCategoriesRouter = require("./routes/SetProductCategories");
const ProductCategoriesRouter = require("./routes/ProductCategories");
const ProductRouter = require("./routes/Product");
const SetProductRouter = require("./routes/SetProduct");
const SearchRouter = require('./routes/Search')
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");


//ROUTER IMPORT

dotenv.config({ path: "./config/config.env" });
const app = express();

connectDB();

// Манай рест апиг дуудах эрхтэй сайтуудын жагсаалт :
var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",

  "http://gotire.mn",
  "http://www.gotire.mn",
  "http://admin.gotire.mn",
  "http://www.admin.gotire.mn",

  "https://gotire.mn",
  "https://www.gotire.mn",
  "https://admin.gotire.mn",
  "https://www.admin.gotire.mn",
];

// Өөр домэйн дээр байрлах клиент вэб аппуудаас шаардах шаардлагуудыг энд тодорхойлно
var corsOptions = {
  // Ямар ямар домэйнээс манай рест апиг дуудаж болохыг заана
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      // Энэ домэйнээс манай рест рүү хандахыг зөвшөөрнө
      callback(null, true);
    } else {
      // Энэ домэйнд хандахыг хориглоно.
      callback(new Error("Хандах боломжгүй."));
    }
  },
  // Клиент талаас эдгээр http header-үүдийг бичиж илгээхийг зөвшөөрнө
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  // Клиент талаас эдгээр мэссэжүүдийг илгээхийг зөвөөрнө
  methods: "GET, POST, PUT, DELETE",
  // Клиент тал authorization юмуу cookie мэдээллүүдээ илгээхийг зөвшөөрнө
  credentials: true,
};

app.use("/uploads", express.static("public/upload"));
// Cookie байвал req.cookie рүү оруулж өгнө0
app.use(cookieParser());
// Өөр өөр домэйнтэй вэб аппуудад хандах боломж өгнө
app.use(cors(corsOptions));
// логгер
app.use(logger);
// Body дахь өгөгдлийг Json болгож өгнө
app.use(express.json());

// Клиент вэб аппуудыг мөрдөх ёстой нууцлал хамгаалалтыг http header ашиглан зааж өгнө
app.use(helmet());
// клиент сайтаас ирэх Cross site scripting халдлагаас хамгаална
app.use(xss());
// Клиент сайтаас дамжуулж буй MongoDB өгөгдлүүдийг халдлагаас цэвэрлэнэ
app.use(mongoSanitize());
// Сэрвэр рүү upload хийсэн файлтай ажиллана
app.use(fileupload());
// http parameter pollution халдлагын эсрэг books?name=aaa&name=bbb  ---> name="bbb"
app.use(hpp());

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
app.use(morgan("combined", { stream: accessLogStream }));

// REST API RESOURSE
app.use("/api/v1/banners", bannerRouters);
app.use("/api/v1/contacts", contactRouters);
app.use("/api/v1/faqs", faqRouters);
app.use("/api/v1/footermenus", footerRouters);
app.use("/api/v1/gallerys", galleryRouters);
app.use("/api/v1/invoices", invoiceRouters);
app.use("/api/v1/menus", menuRouters);
app.use("/api/v1/news", newsRouters);
app.use("/api/v1/news-categories", newsCategoriesRouters);
app.use("/api/v1/orders", orderRouters);
app.use("/api/v1/pages", pageRouters);
app.use("/api/v1/partners", partnerRouters);
app.use("/api/v1/paytypes", payTypeRouters);
app.use("/api/v1/payment", qpayRouters);
app.use("/api/v1/services", serviceRouters);
app.use("/api/v1/slinks", socialLinkRouters);
app.use("/api/v1/tires", tireRouters);
app.use("/api/v1/tiremakes", tireMakeRouters);
app.use("/api/v1/tiremodals", tireModalRouters);
app.use("/api/v1/users", userRouters);
app.use("/api/v1/webinfo", webInfoRouters);
app.use("/api/v1/imgupload", uploadRouters);
app.use("/api/v1/file", fileRouters);
app.use("/api/v1/wheels", wheelRouters);
app.use("/api/v1/wheelcategories", wheelCategoriesRouter);
app.use("/api/v1/tirecategories", TireCategoriesRouter);
app.use("/api/v1/setproducts", SetProductRouter);
app.use("/api/v1/setproductcategories", SetProductCategoriesRouter);
app.use("/api/v1/productcategories", ProductCategoriesRouter);
app.use('/api/v1/search', SearchRouter)
app.use("/api/v1/products", ProductRouter);
app.use(errorHandler);
// Алдаа үүсэхэд барьж авч алдааны мэдээллийг клиент тал руу автоматаар мэдээлнэ

// express сэрвэрийг асаана.
const server = app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} порт дээр аслаа....`)
);

// Баригдалгүй цацагдсан бүх алдаануудыг энд барьж авна
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
