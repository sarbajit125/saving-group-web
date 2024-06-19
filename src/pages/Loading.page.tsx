import { Container, LoadingOverlay } from '@mantine/core';

const LoadingScreen = () => (
        <Container fluid>
            <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        </Container>
    );

export default LoadingScreen;
