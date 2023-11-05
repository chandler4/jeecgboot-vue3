<template>
	<div class="tj-head">
		<div class="logo">
			
		</div>
		<div class="title">
			<div class="tj-name" style="width: 16em;">
				天津滨海智慧交通
			</div>
			<div class="enter-system" @click="enterSystem" >
				进入系统
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from 'vue-router';
	
	const router = useRouter();
	
	function enterSystem() {
		router.push('/main');
	}
</script>

<style lang="scss">

	$logoWidth: 160px;
	
	.tj-head {
		background-color: #3178ec;
		color: #fff;
		
		&.dark-mode{
			background-color: transparent;
		}
		
		&:not(.dark-mode) {
			.enter-system {
				display: none;
			}
		}
		
		.logo {
			background-image: url(/public/imgs/logo-white.svg);
			height: 44px;
			width: $logoWidth;
			display: inline-block;
			background-size: 100%;
			margin-top: -10px;
			margin-left: 20px;
			vertical-align: middle;
		}
		.title {
			display: inline-block;
			height: 100%;
			width: calc(100% - $logoWidth - 20px);
			text-align: center;
			font-size: 24px;
			line-height: 68px;
			
			.enter-system {
				position: absolute;
				right: 20px;
				top:0px;
				cursor: pointer;
			}
		}
		
		.tj-name {
			font-size: 24px;
			color: #fff;
			line-height: 44px;
			letter-spacing: 2px;
			width: auto;
			height: 44px;
			margin: 12px auto 12px;
			border-radius: 10px;
			padding: 0 30px;
			background-image: -moz-linear-gradient(90deg, rgb(16, 78, 139) 0%, rgb(16, 78, 139) 100%);
			background-image: -webkit-linear-gradient(90deg, rgb(16, 78, 139) 0%, rgb(16, 78, 139) 100%);
			background-image: -ms-linear-gradient(90deg, rgb(16, 78, 139) 0%, rgb(16, 78, 139) 100%);
			box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
		}
	}
</style>