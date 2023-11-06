<script>
    import { Column, Grid, Row } from "carbon-components-svelte";
	export let label;
	export let value;
</script>

<Grid>
    <Row>
        <Column style="font-weight: bolder;">
            {label}
        </Column>
    </Row>
    <Row>
        <Column>
            {value}
        </Column>
    </Row>
</Grid>