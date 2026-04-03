import os

hooks = [
    'useState', 'useEffect', 'useContext', 'useReducer', 
    'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 
    'useLayoutEffect', 'useInsertionEffect', 'useParams', 
    'usePathname', 'useRouter', 'useSearchParams', 
    'useSelectedLayoutSegment', 'useSelectedLayoutSegments'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '"use client"' in content or "'use client'" in content:
        return
    
    found_hook = False
    for hook in hooks:
        if hook in content:
            found_hook = True
            break
    
    if found_hook:
        print(f"Adding 'use client' to {filepath}")
        new_content = '"use client";\n\n' + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    root_dir = 'src/app'
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
