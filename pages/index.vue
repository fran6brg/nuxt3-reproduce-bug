<!-- this works -->
<!-- <template>
	<NuxtLayout name="custom">
		<div class="flex-grow">/index</div>
	</NuxtLayout>
</template> -->

<!-- this does not works: why ? -->
<script setup lang="ts">
import { useWallet } from "~~/composables/useWallet";
const { connect } = useWallet();
</script>

<template>
	<NuxtLayout name="custom">
		<div class="flex-grow">/index</div>
		<div class="flex justify-end items-center px-10 py-5">
			<button
				class="
					px-4
					py-2
					rounded-lg
					bg-yellow-900 bg-opacity-40
					hover:bg-opacity-60
					transition-hover
					duration-300
					group
				"
				@click="connect('metamask')"
			>
				<p
					class="
						text-2xl text-gray-400
						group-hover:text-gray-50
						transition-hover
						duration-300
					"
				>
					Connect your wallet
				</p>
			</button>
		</div>
	</NuxtLayout>
</template>
