<template>
    <div class="header">
        <div class="container">
            <div class="header__inner">
                <div class="header__logoWrapper">
                    <router-link to="/" tag="div" class="header__logo">Shoptime</router-link>
                </div>
                <slot name="routerLink"></slot>
                <div class="header__right">
                    <div class="header__rightText">ADMIN</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>
