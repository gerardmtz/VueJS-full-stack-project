<template>
    <v-main>
        <div class="d-flex flex-column align-center justify-center" style="min-height:100vh;">
        <v-card class="mx-auto pa-12 pb-8 d-flex flex-column align-center justify-center"
        elevation="8"
        max-width="30rem"
        min-width="25rem"
        rounded="lg" 
        >
            <h1>Hi! {{ username }}</h1>
                <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
            <p>Username:</p>
            <p>E-mail:</p>
        </v-card>
    </div>
    </v-main>
</template>

<script>

export default{

}


</script>