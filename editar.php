<?php
include 'includes/funciones/funciones.php';
include 'includes/layout/header.php';

$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if (!$id) {
    die('no es valido');
}

$resultado = obtenerContactos($id);
$contacto = $resultado->fetch_assoc();



?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>

    </div>
</div>


<div class="bg-amarillo contenedor sombra">
    <form id='contacto' action="#">
        <legend>Edite el contacto</legend>
        <span>Todos los campos son obligatorios</span>

        <div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" placeholder="Nombre Contacto" id="nombre" value="<?php echo ($contacto['nombre']) ? $contacto['nombre']  : ''; ?>">
            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" placeholder="Nombre Empresa" id="empresa" value="<?php echo ($contacto['empresa']) ? $contacto['empresa']  : ''; ?>">
            </div>
            <div class="campo">
                <label for="telefono">telefono:</label>
                <input type="tel" placeholder="Telefono Contacto" id="telefono" value="<?php echo ($contacto['telefono']) ? $contacto['telefono']  : ''; ?>">
            </div>
        </div>
        <div class="campo enviar">
            <?php
            $textobtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir';

            $accion = ($contacto['telefono']) ? 'editar' : 'crear';


            ?>


            <input type="hidden" id="accion" value="<?php echo $accion ?>">

            <?php if (isset($contacto['id'])) { ?>
                <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">

            <?php } ?>

            <input type="submit" value="<?php echo $textobtn ?>">
        </div>



    </form>
</div>


<?php include 'includes/layout/footer.php'; ?>