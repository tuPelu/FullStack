<html>
<body>

Welcome <?php echo $_GET["name"]; ?><br>
Your email address is: <?php echo $_GET["email"]; ?><br>
Your car is: 
<?php if ($_GET["cars"] == "volvo") {
    echo "Volvo";
} ?>
<?php if ($_GET["cars"] == "saab") {
    echo "Saab";
} ?>
<?php if ($_GET["cars"] == "fiat") {
    echo "Fiat";
} ?>
<?php if ($_GET["cars"] == "audi") {
    echo "Audi";
} ?>
<?php if ($_GET["cars"] == "notengo") {
    echo "No Tengo";
} ?>

Your message is: <?php echo $_GET["message"]; ?><br>

</body>
</html>