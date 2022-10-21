import React from 'react';

interface JSXRulesProps {
  text: string;
}

const JSXRules = ({ text }: JSXRulesProps) => <blockquote>{text}</blockquote>;

export default JSXRules;
