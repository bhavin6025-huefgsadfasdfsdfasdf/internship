import os

def find_pages(start_dir):
    pages = []
    for root, dirs, files in os.walk(start_dir):
        if 'page.tsx' in files:
            # Convert absolute path to relative route
            rel_path = os.path.relpath(root, start_dir)
            if rel_path == '.':
                pages.append('/')
            else:
                # Handle route groups like (admin) and dynamic routes like [role]
                route = '/' + rel_path.replace('\\', '/')
                pages.append(route)
    return pages

if __name__ == "__main__":
    start_path = os.path.join(os.getcwd(), 'src', 'app')
    all_pages = find_pages(start_path)
    with open('all_routes.txt', 'w') as f:
        for page in sorted(all_pages):
            f.write(page + '\n')
