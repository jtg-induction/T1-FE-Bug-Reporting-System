import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
    RenderContainer,
    StyledBlockquote,
    StyledCode,
    StyledH3,
    StyledLi,
    StyledParagraph,
    StyledUl,
} from './CommentRenderer.styles';
import { CommentRendererProps } from './CommentRenderer.types';

export const CommentRenderer = ({ content }: CommentRendererProps) => (
    <RenderContainer>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => (
                    <StyledParagraph variant="body1">
                        {children}
                    </StyledParagraph>
                ),
                h3: ({ children }) => (
                    <StyledH3 variant="h6" component="h3">
                        {children}
                    </StyledH3>
                ),
                ul: ({ children }) => <StyledUl>{children}</StyledUl>,
                ol: ({ children }) => <StyledUl as="ol">{children}</StyledUl>,
                li: ({ children }) => <StyledLi>{children}</StyledLi>,
                blockquote: ({ children }) => (
                    <StyledBlockquote>{children}</StyledBlockquote>
                ),
                code: ({ children }) => <StyledCode>{children}</StyledCode>,
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            color: '#1976d2',
                            textDecoration: 'underline',
                        }}
                    >
                        {children}
                    </a>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    </RenderContainer>
);
