let top = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To do List</title>
    <style>
        body { width: 50%; margin: 0 auto; font-family: Verdana, Geneva, Tahoma, sans-serif;}
        form {border: 1px solid teal; padding: 10px;}
        label { background-color: teal; color: white; padding: 3px;}
        h1 { background-color: cornflowerblue; color: white; padding: 15px;}
        div { display:flex; }
        img { height: 30%; width: 30%; border-radius: 50%}
        div a { margin: 0px auto}
        h1 a {font-size: 1rem}
    </style>
</head>
<body>
    <h1> To do Items <a href="/">Logout</a></h1>
    <div>
        <a href="/list/all">All Items</a>
        <a href="/list/mine">My Items</a>
    </div>
    <form action='/list/mine' method="POST">
        <input type='text' name='item'>
        <input type="submit" value="submit" />
    </form>
    <br>
`;

module.exports = top;