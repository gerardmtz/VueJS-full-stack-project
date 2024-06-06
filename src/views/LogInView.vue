<template>
    <v-main>
        <div  class="d-flex justify-center align-center" style="min-height: 100vh;">
            <v-card class="mx-auto pa-12 pb-8"
            elevation="8"
            min-width="448"
            rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        
        <v-text-field
        density="compact"
        placeholder="Email Address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined">
        </v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Password
        </div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eyeoff': 'mdi-eye'"
        :type="visible ? 'text':'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible =!visible"
        >
        </v-text-field>

        <v-btn class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block> LogIn</v-btn>

        <v-card-text class="text-center">
            <a href="SignUpView.vue" class="text-blue text-decoration-none"
            rel="noopener noreferrer"
            target="_blank"> Sign up now <v-icon icon="mdi-chevron-right"></v-icon></a>
        </v-card-text>
        </v-card>
        </div>
    </v-main>
</template>

<script>
export default{
    data: () => ({
        visible:false,
    }),
}
</script>