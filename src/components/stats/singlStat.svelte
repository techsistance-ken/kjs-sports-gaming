<script>
    import { Column, Grid, Row } from "carbon-components-svelte";
	export let label;
	export let value;
</script>

<Grid>
    <Row>
        <Column>
            {label}
        </Column>
    </Row>
    <Row>
        <Column>
            {value}
        </Column>
    </Row>
</Grid>