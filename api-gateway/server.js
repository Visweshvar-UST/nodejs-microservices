const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;
try{
app.use('/sales', createProxyMiddleware({ 
  target: 'http://127.0.0.1:3001/sales', 
  changeOrigin: true, 
  onError: (err, req, res) => {
    console.error('Error in /sales proxy:', err);
    res.status(500).send('Proxy error in /sales');
  }
}));
app.use('/products', createProxyMiddleware({ 
  target: 'http://127.0.0.1:3002/products', 
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Error in /sales proxy:', err);
    res.status(500).send('Proxy error in /sales');
  }
}));
app.use('/customers', createProxyMiddleware({ 
  target: 'http://127.0.0.1:3003/customers', 
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error('Error in /sales proxy:', err);
    res.status(500).send('Proxy error in /sales');
  }

}));

app.get('/', (req, res) => {
  res.send('API Gateway is running. Please use /sales, /products, or /customers.');
});
}  catch (error) {
  console.error(error);
}

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});