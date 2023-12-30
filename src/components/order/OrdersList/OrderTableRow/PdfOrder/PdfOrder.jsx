import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { currencyFormatter } from '../../../../../utils/currencyFormatter';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  product: {
    marginBottom: 5,
    borderBottom: '1px solid #ccc',
    paddingBottom: 5,
  },
});

const PdfOrder = ({ order }) => {
  const {
    _id,
    createdAt,
    totalAmount,
    deliveryAddress,
    orderStatus,
    coupon,
    products,
  } = order;
  const { name: couponName } = coupon || {};

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Order Details</Text>
          <Text>ID: {_id}</Text>
          <Text>Created At: {format(parseISO(createdAt), 'dd-MMM-yyyy')}</Text>
          <Text>Total Amount: {currencyFormatter.format(totalAmount)}</Text>
          <Text>Delivery Address: {deliveryAddress}</Text>
          <Text>Coupon: {couponName || '-'}</Text>
          <Text>Order Status: {orderStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Products</Text>
          {products.map((orderProduct) => {
            const { product, count } = orderProduct;
            return (
              <View key={product._id} style={styles.product}>
                <Text>Product name: {product.title}</Text>
                <Text>
                  Product price: {currencyFormatter.format(product.price)}
                </Text>
                <Text>Quantity: {count}</Text>
                <Text>
                  Total Price: {currencyFormatter.format(product.price * count)}
                </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

PdfOrder.propTypes = {
  order: PropTypes.object,
};

export default PdfOrder;
