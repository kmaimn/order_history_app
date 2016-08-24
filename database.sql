SELECT COUNT (orders.id),customers.id, customers.first_name, customers.last_name FROM orders
RIGHT JOIN addresses ON addresses.id = orders.address_id
RIGHT JOIN customers ON customers.id = addresses.customer_id
GROUP BY customers.id;

#2

SELECT (line_items.quantity), customers.id, orders.order_date, products.description, line_items.unit_price, customers.first_name, customers.last_name, addresses.street, addresses.city, addresses.zip, addresses.state FROM line_items
JOIN products ON products.id = line_items.product_id
JOIN orders ON orders.id = line_items.order_id
JOIN addresses ON addresses.id = orders.address_id
JOIN customers ON customers.id = addresses.customer_id
WHERE customers.id = 1
ORDER BY orders.order_date ASC;
