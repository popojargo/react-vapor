// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import Document, {Html, Head, Main, NextScript} from 'next/document';

class Vapor extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head />
                <body className="coveo-styleguide">
                    <Main className="full-content" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Vapor;
