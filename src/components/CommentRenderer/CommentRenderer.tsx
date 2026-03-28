import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
    BoldSpan,
    ItalicSpan,
    StyledBlockquote,
    StyledCode,
    StyledH3,
    StyledLi,
    StyledLink,
    StyledParagraph,
    StyledUl,
} from './CommentRenderer.styles';
import { CommentRendererProps } from './CommentRenderer.types';

export const CommentRenderer = ({ content }: CommentRendererProps) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            p: ({ children }) => (
                <StyledParagraph variant="body2" color="text.primary">
                    {children}
                </StyledParagraph>
            ),
            a: ({ href, children }) => (
                <StyledLink href={href} target="_blank" rel="noopener">
                    {children}
                </StyledLink>
            ),
            ul: ({ children }) => <StyledUl>{children}</StyledUl>,
            li: ({ children }) => <StyledLi>{children}</StyledLi>,
            strong: ({ children }) => (
                <BoldSpan component="span">{children}</BoldSpan>
            ),
            em: ({ children }) => (
                <ItalicSpan component="span">{children}</ItalicSpan>
            ),
            h3: ({ children }) => <StyledH3 variant="h6">{children}</StyledH3>,
            blockquote: ({ children }) => (
                <StyledBlockquote>{children}</StyledBlockquote>
            ),
            code: ({ children }) => (
                <StyledCode component="code">{children}</StyledCode>
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);
